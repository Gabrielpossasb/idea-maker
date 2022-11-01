import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9XVScgYcNgIdQog3naPnWXn0sH-S0r6o",
  authDomain: "test-login-f2dc2.firebaseapp.com",
  projectId: "test-login-f2dc2",
  storageBucket: "test-login-f2dc2.appspot.com",
  messagingSenderId: "296968278286",
  appId: "1:296968278286:web:7c3f130b318fe87ea4075f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app)
