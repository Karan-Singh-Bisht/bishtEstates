// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "mernestate-2df54.firebaseapp.com",
  projectId: "mernestate-2df54",
  storageBucket: "mernestate-2df54.firebasestorage.app",
  messagingSenderId: "30119439866",
  appId: "1:30119439866:web:77640cc609c62663744843",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
