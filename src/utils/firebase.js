// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBmLIMTR1tWpMu04Rnb2YeD316nuynKyi8",
    authDomain: "organdonor-77c18.firebaseapp.com",
    projectId: "organdonor-77c18",
    storageBucket: "organdonor-77c18.appspot.com",
    messagingSenderId: "180358532962",
    appId: "1:180358532962:web:a44627919b3f6061b6263b",
    measurementId: "G-4CV8RKQWKQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export { db, auth, storage };
