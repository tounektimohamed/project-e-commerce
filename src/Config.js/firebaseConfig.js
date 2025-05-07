// Firebase database configuration code is here
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyA4FP5olTC2MjpUPe8x-_6k91fjvyBs6xo",
  authDomain: "scoutapk.firebaseapp.com",
  projectId: "scoutapk",
  storageBucket: "scoutapk.firebasestorage.app",
  messagingSenderId: "387756086923",
  appId: "1:387756086923:web:9c556d0ebed2c636c5268e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export { db };
