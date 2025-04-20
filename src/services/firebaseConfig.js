// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_ixCnRJnnq3_mfm8ubLXx76i1Nt8g06M",
    authDomain: "real-estate-website-5755b.firebaseapp.com",
    projectId: "real-estate-website-5755b",
    storageBucket: "real-estate-website-5755b.firebasestorage.app",
    messagingSenderId: "863911254976",
    appId: "1:863911254976:web:f68af59da08e8a40930625",
    measurementId: "G-FCTD69V4BR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };