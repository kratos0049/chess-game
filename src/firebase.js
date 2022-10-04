// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBY8Lod7MT5FCqP1iQAIRBfPrsc5URCPU",
  authDomain: "chessfb-56759.firebaseapp.com",
  projectId: "chessfb-56759",
  storageBucket: "chessfb-56759.appspot.com",
  messagingSenderId: "134761852052",
  appId: "1:134761852052:web:1556971d6ec8185a141881"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);