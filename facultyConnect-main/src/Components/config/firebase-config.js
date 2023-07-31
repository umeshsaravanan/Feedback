import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBXsJtsM1pZXBu21dUB7mFWVFrJvbnztTk",
  authDomain: "faculty-feedback-d5b2f.firebaseapp.com",
  projectId: "faculty-feedback-d5b2f",
  storageBucket: "faculty-feedback-d5b2f.appspot.com",
  messagingSenderId: "664170760418",
  appId: "1:664170760418:web:c607dcba4bf4b79a8836bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider= new GoogleAuthProvider();
export const emailJsConfig = {
  userId: 'JhNy4JhUODFDG-cFu',
};
export const db = getFirestore(app);
export const storage = getStorage(app);