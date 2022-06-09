import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";

import {  getAuth} from "firebase/auth";
import  "firebase/compat/firestore";
import {getStorage} from 'firebase/storage'

const firebaseConfig = ({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.REACT_APP_FIREBASE_APP_ID
});

const app =  initializeApp(firebaseConfig)
firebase.initializeApp(firebaseConfig)

const storage = getStorage(app);
export {storage ,  firebase as default}

export const db = firebase.firestore()

export const auth = getAuth(app)