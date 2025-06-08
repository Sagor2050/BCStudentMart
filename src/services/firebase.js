// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ All values are pulled from your .env file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bcstudentmart.firebaseapp.com",
  projectId: "bcstudentmart",
  storageBucket: "bcstudentmart.firebasestorage.app", // ✅ FIXED HERE
  messagingSenderId: "713637857662",
  appId: "1:713637857662:web:f16e0b615b6cfa8d260b2f",
  measurementId: "G-LSJYHJDN8C"
};

const app = initializeApp(firebaseConfig);

// ✅ Explicitly specify bucket in getStorage to override default
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app, "gs://bcstudentmart.firebasestorage.app");
