// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCIcdXHiH1bG34P6v5_x3EPqDXUf2WzR8",
  authDomain: "growmind-84454.firebaseapp.com",
  projectId: "growmind-84454",
  storageBucket: "growmind-84454.firebasestorage.app",
  messagingSenderId: "1023776735237",
  appId: "1:1023776735237:web:9af5a3eed1b746fc9c5c6c",
  measurementId: "G-DHLD91B6YC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };