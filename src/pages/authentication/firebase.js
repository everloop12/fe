// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdvkn8Bv7aoEXJ6fmXP-YZ3faP9VIoWpc",
    authDomain: "medicine-qa-dev.firebaseapp.com",
    projectId: "medicine-qa-dev",
    storageBucket: "medicine-qa-dev.appspot.com",
    messagingSenderId: "19650706729",
    appId: "1:19650706729:web:8fb9d9ce40019984e6cb38",
    measurementId: "G-T7PZQZPGNR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const fireAuth = getAuth(app);

