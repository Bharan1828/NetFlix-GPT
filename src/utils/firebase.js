// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsRNlLT7sJjsNklspnGddylH2r-NJs8dw",
  authDomain: "netflixgpt-bc7a7.firebaseapp.com",
  projectId: "netflixgpt-bc7a7",
  storageBucket: "netflixgpt-bc7a7.firebasestorage.app",
  messagingSenderId: "79103670933",
  appId: "1:79103670933:web:18e1805b60f03c0672b99c",
  measurementId: "G-2GG6CZNW9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();