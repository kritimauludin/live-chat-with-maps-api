import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain,
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "...",
    measurementId: "..."
  };

  const app = firebase.initializeApp(firebaseConfig)
  const db = app.firestore()

  export default db
