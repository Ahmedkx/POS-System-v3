import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firebase-config";

const useGenerateBarcode = () => {
    const [barcode, setBarcode] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const generateRandomBarcode = () => {
        return Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    };

    const checkBarcodeExists = async (barcode: number) => {
        const barcodeRef = collection(db, "Products");
        const barcodeQuery = query(barcodeRef, where("barcode", "==", barcode));
        const snapshot = await getDocs(barcodeQuery);
        return !snapshot.empty;
    };

    const generateUniqueBarcode = async () => {
        setLoading(true);
        const newBarcode: number = generateRandomBarcode();
        if (await checkBarcodeExists(newBarcode)) {
            generateUniqueBarcode();
        } else {
            setBarcode(newBarcode);
            setLoading(false);
        }
    };

    useEffect(() => {
        generateUniqueBarcode();
    }, []); // Generate barcode on component mount

    return [barcode, generateUniqueBarcode, loading];
};

export default useGenerateBarcode;
