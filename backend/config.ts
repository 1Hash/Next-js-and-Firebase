import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCF1utGdeHm5_FLHNM4If1G1OPgG0zH_lU",
  authDomain: "webapp-218ac.firebaseapp.com",
  projectId: "webapp-218ac",
  storageBucket: "webapp-218ac.appspot.com",
  messagingSenderId: "396885206929",
  appId: "1:396885206929:web:adcc793fecd98c02819c30",
  measurementId: "G-K0VRE0E3XV"
};

const app = initializeApp(firebaseConfig);
//const auth = getAuth(app);
const db = getFirestore(app);

export default db;
