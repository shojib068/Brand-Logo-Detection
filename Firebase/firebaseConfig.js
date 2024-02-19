// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, initializeAuth} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVmZbZm3WM2Nf7MHrNWTdUtmN_KKl0l0A",
  authDomain: "brandlogodetection-ccf38.firebaseapp.com",
  projectId: "brandlogodetection-ccf38",
  storageBucket: "brandlogodetection-ccf38.appspot.com",
  messagingSenderId: "640117096636",
  appId: "1:640117096636:web:c7125d7a2bfb5f4b2350b9",
  measurementId: "G-22M2004KKN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// export const auth = getAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
//   });
export const db = getFirestore(app);
// const analytics = getAnalytics(app);