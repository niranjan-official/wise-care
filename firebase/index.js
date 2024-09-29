import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0Co-z4mcDzzOFTltCYPtnOSihPxPVRoU",
  authDomain: "wisecare-72651.firebaseapp.com",
  projectId: "wisecare-72651",
  storageBucket: "wisecare-72651.appspot.com",
  messagingSenderId: "937353943426",
  appId: "1:937353943426:web:812f6e6a5e840e5d03d79b"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);