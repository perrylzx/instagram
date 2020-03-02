// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs

import * as firebase from "firebase/app";
// TODO(PERRY): Import Firebase product that we want (cloud functions?)
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

// TODO(PERRY): Put this secret in the firebase secret product
const firebaseConfig = {
  apiKey: "AIzaSyDZYJjXiLcbZ3y7pniLh-CLGweC4pX6o5Q",
  authDomain: "kittengram-9e684.firebaseapp.com",
  databaseURL: "https://kittengram-9e684.firebaseio.com",
  projectId: "kittengram-9e684",
  storageBucket: "kittengram-9e68 4.appspot.com",
  messagingSenderId: "573249771518",
  appId: "1:573249771518:web:0c2f0f0af3beafeebe52af",
  measurementId: "G-SGK51F5HLX"
};

firebase.initializeApp(firebaseConfig);
