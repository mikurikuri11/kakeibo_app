// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHsKj0-uvUux1es6YWRcQHV0X_m5NufX8",
  authDomain: "kakeibo-app-2f582.firebaseapp.com",
  projectId: "kakeibo-app-2f582",
  storageBucket: "kakeibo-app-2f582.appspot.com",
  messagingSenderId: "45001479147",
  appId: "1:45001479147:web:ad47f3def98529781bbfae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
