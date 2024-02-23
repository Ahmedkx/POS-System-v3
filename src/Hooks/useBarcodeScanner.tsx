import { useState, useEffect } from "react";

const useBarcodeScanner = (callback) => {
    const [scannedBarcode, setScannedBarcode] = useState("");

    useEffect(() => {
        let barcode = "";
        let interval;

        const handleKeyDown = (evt) => {
            if (interval) clearInterval(interval);
            if (evt.code === "Enter") {
                if (barcode) {
                    setScannedBarcode(barcode);
                    callback(barcode);
                    barcode = "";
                }
                return;
            }
            if (evt.key !== "Shift") barcode += evt.key;
            interval = setInterval(() => (barcode = ""), 20);
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            clearInterval(interval);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [callback]);

    return scannedBarcode;
};

export default useBarcodeScanner;
