/* eslint-disable consistent-return */
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

export default async function getUser(id) {
    try {
        const querySnapshot = await getDoc(doc(db, "organDonor", id));
        if (querySnapshot.exists()) {
            return querySnapshot;
        }
        return false;
    } catch (error) {
        console.log(error);
    }
}
