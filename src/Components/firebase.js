import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

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
