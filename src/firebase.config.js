// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaEit9XFbaFmcgKao-7LJAsNt177gmjyM",
  authDomain: "movie-list-e3f4b.firebaseapp.com",
  projectId: "movie-list-e3f4b",
  storageBucket: "movie-list-e3f4b.appspot.com",
  messagingSenderId: "538625802897",
  appId: "1:538625802897:web:6b343b093d2b08a29cb530"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();