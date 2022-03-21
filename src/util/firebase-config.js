import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "expenses-tracker-6a559.firebaseapp.com",
    databaseURL: "https://expenses-tracker-6a559-default-rtdb.firebaseio.com",
    projectId: "expenses-tracker-6a559",
    storageBucket: "expenses-tracker-6a559.appspot.com",
    messagingSenderId: "1011057699660",
    appId: "1:1011057699660:web:afbb26c3136883258a7de9",
    measurementId: "G-9M5EYE0KRP"
  };

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);
