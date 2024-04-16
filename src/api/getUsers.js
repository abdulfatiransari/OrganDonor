/* eslint-disable consistent-return */
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

export default async function getUsers() {
    try {
        const querySnapshot = await getDocs(collection(db, "organDonor"));
        return querySnapshot.docs.map((i) => ({ ...i.data(), id: i.id }));
    } catch (error) {
        console.log(error);
    }
}
