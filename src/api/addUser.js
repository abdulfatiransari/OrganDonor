import { setDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";

export default async function addUser(data) {
    try {
        await setDoc(doc(db, "organDonor", data.uid), data);
        console.log("Document written with ID:", data.uid);
        // return 'done';
    } catch (e) {
        console.error("Error adding document:", e);
    }
}
