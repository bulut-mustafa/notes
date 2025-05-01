import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { clientConfig } from '@/firebase.config';
export const app = initializeApp(clientConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);