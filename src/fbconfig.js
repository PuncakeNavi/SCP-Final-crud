// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAskIwfJAiVTzAKfbkHF1a7RdIY-8nWDH4",
  authDomain: "kenworth-78c1e.firebaseapp.com",
  projectId: "kenworth-78c1e",
  storageBucket: "kenworth-78c1e.appspot.com",
  messagingSenderId: "996303963518",
  appId: "1:996303963518:web:c7646dc49830ff60c91f2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app)

const db = getFirestore(app);

export{db, storage};