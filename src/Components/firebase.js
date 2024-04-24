import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: import.meta.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: import.meta.env.REACT_APP_FIREBASE_PROJECTID,
  projectId: import.meta.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.REACT_APP_FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
