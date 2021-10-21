import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW15Hxe7iufv7AcfnBVEQwSJBwkUKo43g",
  authDomain: "todo-886ee.firebaseapp.com",
  projectId: "todo-886ee",
  storageBucket: "todo-886ee.appspot.com",
  messagingSenderId: "478186613676",
  appId: "1:478186613676:web:2a37ea72a53dacbb4ea809",
  measurementId: "G-5KQCH2KND8",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore();

export default firebase;


