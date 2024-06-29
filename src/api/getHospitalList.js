/* eslint-disable consistent-return */
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";

export default async function getHospitalList(city) {
    try {
        const q = query(collection(db, "organDonor"), where("type", "==", "hospital"), where("city", "==", city));
        const querySnapshot = await getDocs(q);

        const hospitals = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        return hospitals;
    } catch (error) {
        console.log(error);
    }
}
