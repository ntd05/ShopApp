import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBG9C5eHK4nTXgYAY4DG8sGH2sqQ7mrV80",
  authDomain: "shop-app-9153e.firebaseapp.com",
  databaseURL: "https://shop-app-9153e-default-rtdb.firebaseio.com",
  projectId: "shop-app-9153e",
  storageBucket: "shop-app-9153e.appspot.com",
  messagingSenderId: "362356660965",
  appId: "1:362356660965:web:3208803bbdb8ba6c82d20c",
  measurementId: "G-BSTYH0YVSX"
  };
// ko biet loi gi thoi  ngu di nan ni trung ngu ok thoi ngu dichao trung iu trung <3 hihi
    firebase.initializeApp(firebaseConfig);
  export default firebase;