// Import the functions you need from the SDKs you need
import firebase from "firebase";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTYeJikg3LWXBXd96gW4hKM_8LEtHSa4Q",
  authDomain: "asffas-8880a.firebaseapp.com",
  projectId: "asffas-8880a",
  storageBucket: "asffas-8880a.appspot.com",
  messagingSenderId: "181160870539",
  appId: "1:181160870539:web:79219b7457c65c8d8aca8e",
  measurementId: "G-KS3BG4VG1N"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app)

export {db}