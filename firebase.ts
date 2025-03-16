// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { clientConfig } from '@/firebase.config';
// Initialize Firebase
export const app = initializeApp(clientConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);