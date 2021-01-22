// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDGmwRk26TjI11dlxbRMqXIrRv5iSmF7xg",
    authDomain: "crud-94d04.firebaseapp.com",
    projectId: "crud-94d04",
    storageBucket: "crud-94d04.appspot.com",
    messagingSenderId: "951501285379",
    appId: "1:951501285379:web:17583408362f57ef434636",
    measurementId: "G-S5CP5SHCJK"
};
firebase.initializeApp(firebaseConfig);

// Get a Firestore instance
// export const db = firebase.firestore();
export const firebaseApp = firebase;

// export const config = firebaseConfig;
