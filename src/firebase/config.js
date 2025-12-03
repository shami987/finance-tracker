// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// TODO: Replace with your actual Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyD-VFRGXxpn1ni915YEiSIhcSQmGybak38",
  authDomain: "sampleapp-e3a93.firebaseapp.com",
  projectId: "sampleapp-e3a93",
  storageBucket: "sampleapp-e3a93.firebasestorage.app",
  messagingSenderId: "374651320648",
  appId: "1:374651320648:web:6ee08a67e89aa30b051b7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;