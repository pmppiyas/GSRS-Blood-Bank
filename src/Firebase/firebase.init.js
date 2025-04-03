import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDkZpGo_SbwXC-kntu0AmQ4KNN4zGD1x-c",
  authDomain: "all-projects-6d028.firebaseapp.com",
  projectId: "all-projects-6d028",
  storageBucket: "all-projects-6d028.firebasestorage.app",
  messagingSenderId: "501627054918",
  appId: "1:501627054918:web:dcbf8efaa21f880cf05347",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
