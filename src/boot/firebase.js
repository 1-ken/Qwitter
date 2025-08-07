import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdg8FbZ-HSc2Fr_pPsIhUfAzexoSy4uFw",
  authDomain: "qwitter-96a65.firebaseapp.com",
  projectId: "qwitter-96a65",
  storageBucket: "qwitter-96a65.firebasestorage.app",
  messagingSenderId: "48858908177",
  appId: "1:48858908177:web:dfd51797dffaf147d653b0"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export default db;
