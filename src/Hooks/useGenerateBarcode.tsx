import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase-config";

export default function useGenerateBarcode() {
    function randomNumber() {
        return Math.floor(1000 + Math.random() * 9000);
    }
    async function checkRandomNumber() {
        const docRef = doc(db, "cities", "SF");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    checkRandomNumber();
    return Math.floor(1000 + Math.random() * 9000);
}
