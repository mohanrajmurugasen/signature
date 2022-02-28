// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGAvxEVD4Ij16di_uoUVoAUyCAyx-fbwo",
  authDomain: "web-otp-7c33f.firebaseapp.com",
  projectId: "web-otp-7c33f",
  storageBucket: "web-otp-7c33f.appspot.com",
  messagingSenderId: "620745625962",
  appId: "1:620745625962:web:03fe87e7cb5fb7b54cd513",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
