import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDkpJkYLEFE3r-oyqpdG_4uGJEo9IDYAo8",
    authDomain: "tem-sabor-auth.firebaseapp.com",
    projectId: "tem-sabor-auth",
    storageBucket: "tem-sabor-auth.appspot.com",
    messagingSenderId: "452576142508",
    appId: "1:452576142508:web:144b4553e640ed2f68ab09"
};


const app = initializeApp(firebaseConfig);

export default app