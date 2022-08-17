import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBYYxwTH7UOavholr4Qxs0f4QYnVWA7KrQ",
    authDomain: "learnvue-location.firebaseapp.com",
    projectId: "learnvue-location",
    storageBucket: "learnvue-location.appspot.com",
    messagingSenderId: "649318230254",
    appId: "1:649318230254:web:f899068687e23432722bff",
    measurementId: "G-RZ0MLX2XCN"
  };

  const app = firebase.initializeApp(firebaseConfig)
  const db = app.firestore()

  export default db