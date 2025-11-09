import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIHXEVXIfCWHYwW5VQ5EDj8Q3c26lXPAk",
  authDomain: "loginauthentication-60719.firebaseapp.com",
  projectId: "loginauthentication-60719",
  storageBucket: "loginauthentication-60719.firebasestorage.app",
  messagingSenderId: "970909811271",
  appId: "1:970909811271:web:3a0856c97e305c3bf7e762"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
