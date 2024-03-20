import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyB6zd7cgi-vGyE2hazgfDXKJUi3Bv8yrg4",
  authDomain: "email-password-verificat-6897d.firebaseapp.com",
  projectId: "email-password-verificat-6897d",
  storageBucket: "email-password-verificat-6897d.appspot.com",
  messagingSenderId: "750425990259",
  appId: "1:750425990259:web:7ce2a3f0244276721b7606"
};
const app = initializeApp(firebaseConfig);
const database =getAuth(app)
export default database;