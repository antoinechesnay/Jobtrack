import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase project configuration
// Get this from Firebase Console -> Project Settings -> General -> Your apps
const firebaseConfig = {
    apiKey: "AIzaSyDSxrSloDfReiF2SJsMOBJTwB_3o4snUaA",
    authDomain: "job-applier-479614.firebaseapp.com",
    projectId: "job-applier-479614",
    storageBucket: "job-applier-479614.firebasestorage.app",
    messagingSenderId: "955085072936",
    appId: "1:955085072936:web:fb6270f43616914530631d",
    measurementId: "G-YWMC0GCQFD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Force login on every visit (session only)
setPersistence(auth, browserSessionPersistence);

export const db = getFirestore(app);
