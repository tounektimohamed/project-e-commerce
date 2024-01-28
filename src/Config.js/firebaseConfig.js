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
  apiKey: "AIzaSyDJlJEPXibbEdsM-0Dy_ltis3G08j_crh8",
  authDomain: "e-comerce-5e119.firebaseapp.com",
  projectId: "e-comerce-5e119",
  storageBucket: "e-comerce-5e119.appspot.com",
  messagingSenderId: "581444591910",
  appId: "1:581444591910:web:26dff9136befe774b961e7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export { db };
