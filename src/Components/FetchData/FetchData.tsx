import { useEffect } from "react";
import { useProductsStore } from "../../Store";
import { useSettingsStore } from "../../Store";
import { db } from "../../Firebase-config";
import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    limit,
} from "firebase/firestore";
import data from "../../data.json";

export default function FetchData() {
    const { updateProducts } = useProductsStore();
    const { updateProfit } = useSettingsStore();
    const { updateDistributorsNames } = useSettingsStore();
    const { updateCompanyNames } = useSettingsStore();
    const { updateProductSizes } = useSettingsStore();

    useEffect(() => {
        const q = query(
            collection(db, "Products"),
            orderBy("name")
            // , limit(50)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() });
            });
            updateProducts(docs);
        });
        // updateProducts(data);
    }, []);

    useEffect(() => {
        async function getProfit() {
            const docRef = doc(db, "Settings", "profitPercentages");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                updateProfit(docSnap.data().percentage);
            } else {
                console.log("No such document!");
            }
        }
        getProfit();
    }, []);

    useEffect(() => {
        const q = query(doc(db, "Settings", "distributorsNames"));
        const unsub = onSnapshot(q, (doc) => {
            updateDistributorsNames(doc.data().data);
        });
    }, []);

    useEffect(() => {
        const q = query(doc(db, "Settings", "companyNames"));
        const unsub = onSnapshot(q, (doc) => {
            updateCompanyNames(doc.data().data);
        });
    }, []);

    useEffect(() => {
        const q = query(doc(db, "Settings", "productSizes"));
        const unsub = onSnapshot(q, (doc) => {
            updateProductSizes(doc.data().data);
        });
    }, []);

    return <></>;
}
