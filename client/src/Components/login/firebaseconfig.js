// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCtyu9p1zbZPzA-oU20Xd_27uzSkhJ5T0g",
  authDomain: "flawless-helper-403212.firebaseapp.com",
  projectId: "flawless-helper-403212",
  storageBucket: "flawless-helper-403212.appspot.com",
  messagingSenderId: "703349034098",
  appId: "1:703349034098:web:a482945717f35d3a3286eb",
  measurementId: "G-9LQ1TG6KTV"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
export default auth;
