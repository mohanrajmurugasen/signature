import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo8JcpvzVlbAJEliuj8UxQ7C4vVqLxIEc",
  authDomain: "lakshmijewellery-8b36d.firebaseapp.com",
  projectId: "lakshmijewellery-8b36d",
  storageBucket: "lakshmijewellery-8b36d.appspot.com",
  messagingSenderId: "786692384240",
  appId: "1:786692384240:web:f46f0180ff326bd12de935",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
