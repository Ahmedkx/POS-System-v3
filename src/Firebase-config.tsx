import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
    collection,
    doc,
    getDocs,
    getFirestore,
    updateDoc,
} from "firebase/firestore";

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

const addSaveExpiryDatesField = async () => {
    const productsCollectionRef = collection(db, "Products");
    try {
        const querySnapshot = await getDocs(productsCollectionRef);
        querySnapshot.forEach(async (document) => {
            const docRef = doc(db, "Products", document.id);
            await updateDoc(docRef, {
                saveExpiryDates: true,
            });
        });
        console.log("All documents updated successfully");
    } catch (error) {
        console.error("Error updating documents: ", error);
    }
};

// addSaveExpiryDatesField();
