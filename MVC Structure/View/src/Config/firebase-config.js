// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5vN1GBZCjSH1d7MQqiobIxONVPi7qZ4w",
  authDomain: "cse470-project.firebaseapp.com",
  projectId: "cse470-project",
  storageBucket: "cse470-project.appspot.com",
  messagingSenderId: "1022797520154",
  appId: "1:1022797520154:web:c03a0b724ea49c3f80e0a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authenticaiton = getAuth(app)