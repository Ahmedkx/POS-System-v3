import { initializeApp } from "firebase/app";
import {
    persistentLocalCache,
    persistentMultipleTabManager,
    initializeFirestore,
    addDoc,
    collection,
    getDocs,
    getFirestore,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Products from "./data.json";
import useCalculateSellPrice from "./Hooks/useCalculateSellPrice";

// Live
// const firebaseConfig = {
//     apiKey: "AIzaSyD7gKF47uzz4PWbWKBtUu-BC_vzY-pNjGk",
//     authDomain: "prices-v2.firebaseapp.com",
//     projectId: "prices-v2",
//     storageBucket: "prices-v2.appspot.com",
//     messagingSenderId: "684344931390",
//     appId: "1:684344931390:web:0080ec02a2064bdfef8d6f",
// };

// Testing
const firebaseConfig = {
    apiKey: "AIzaSyC6JRTK49p6OJnVqp9b7_1ZVyNq3c5zdtE",
    authDomain: "prices2-test.firebaseapp.com",
    projectId: "prices2-test",
    storageBucket: "prices2-test.appspot.com",
    messagingSenderId: "630106354685",
    appId: "1:630106354685:web:d259d32b09d6243ce41f94",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const db = initializeFirestore(app, {
//     localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
// });

export const auth = getAuth();

// signInWithEmailAndPassword(
//     auth,
//     "test",
//     "fhGQw4^wFVJ7YR@w3yXJxyfmzRfg!9$592bU9Ka7&^$JTMhdx*TaKDb5JZ^g"
// )
//     .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         // ...
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//     });

// fhGQw4^wFVJ7YR@w3yXJxyfmzRfg!9$592bU9Ka7&^$JTMhdx*TaKDb5JZ^g

// const querySnapshot = await getDocs(collection(db, "Products"));
// querySnapshot.forEach((doc) => {
//     console.log(doc.data());
// });

// async function addData() {
//     for (let i = 0; i < Products.length; i++) {
//         await addDoc(collection(db, "Products"), {
//             name: Products[i].name,
//             company: Products[i].company,
//             price: Products[i].price,
//             sellPrice1: useCalculateSellPrice(Products[i].price),
//             quantity: 0,
//             size: Products[i].size,
//             autoBarcode: Products[i].autobarcode,
//             barcode: Products[i].barcode,
//             lowStock: false,
//         });
//     }
//     console.log("Finished");
// }
// addData();

// ===========================================================================

// const firebaseConfigOld = {
//     apiKey: "AIzaSyBEq5mha3tfRaEuhVXYNIkohrq88YctifY",
//     authDomain: "prices-acf7b.firebaseapp.com",
//     projectId: "prices-acf7b",
//     storageBucket: "prices-acf7b.appspot.com",
//     messagingSenderId: "228237292585",
//     appId: "1:228237292585:web:cc0b18acca5c4890f91838",
// };

// // Initialize Firebase
// const appOld = initializeApp(firebaseConfigOld);
// export const db = getFirestore(appOld);

// const querySnapshot = await getDocs(collection(db, "Products"));
// const data = [];
// querySnapshot.forEach((doc) => {
//     data.push(doc.data());
// });
// console.log(data);
