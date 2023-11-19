import { create } from "zustand";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const useProductStore = create(() => ({
    bears: 0,
}));

console.log("Test");

// function getProducts() {
//     const q = query(collection(db, "Products"), orderBy("name"));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const docs = [];
//         querySnapshot.forEach((doc) => {
//             docs.push({ id: doc.id, ...doc.data() });
//         });
//         console.log("Fetch Data");
// }

// getProducts();
