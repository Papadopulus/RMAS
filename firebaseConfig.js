import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/storage";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD3WD0sA-HI1tyDUYJSGxrchamK58iwC_I",
  authDomain: "rmasproject-d8c7f.firebaseapp.com",
  projectId: "rmasproject-d8c7f",
  storageBucket: "rmasproject-d8c7f.appspot.com",
  messagingSenderId: "623898743461",
  appId: "1:623898743461:web:19e877d3d2e4080bf2b34c",
  measurementId: "G-9FSZYDQVDH",
};
if (!firebase.apps.length) {
  const app = firebase.initializeApp(firebaseConfig);
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}
export { firebase };
// export const FIREBASE_APP = initializeApp(firebaseConfig);

// export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
