// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6JRTK49p6OJnVqp9b7_1ZVyNq3c5zdtE",
    authDomain: "prices2-test.firebaseapp.com",
    projectId: "prices2-test",
    storageBucket: "prices2-test.appspot.com",
    messagingSenderId: "630106354685",
    appId: "1:630106354685:web:d259d32b09d6243ce41f94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
