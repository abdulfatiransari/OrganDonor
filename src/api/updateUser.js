/* eslint-disable consistent-return */
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

export default async function updateUser(id, data) {
    try {
        await updateDoc(doc(db, "organDonor", id), data);
    } catch (error) {
        console.log(error);
    }
}
