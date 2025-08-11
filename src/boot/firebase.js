// Updated to Firebase v9+ modular syntax
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdg8FbZ-HSc2Fr_pPsIhUfAzexoSy4uFw",
  authDomain: "qwitter-96a65.firebaseapp.com",
  projectId: "qwitter-96a65",
  storageBucket: "qwitter-96a65.appspot.com", // Fixed storage bucket format
  messagingSenderId: "48858908177",
  appId: "1:48858908177:web:dfd51797dffaf147d653b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
