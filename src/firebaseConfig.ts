import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB17vCRIs6J30OOdw2GT9zrDLur93I8rA",
  authDomain: "chat-app-84861.firebaseapp.com",
  projectId: "chat-app-84861",
  storageBucket: "chat-app-84861.appspot.com",
  messagingSenderId: "560351886796",
  appId: "1:560351886796:web:7e99dcc7344adde24af169",
  measurementId: "G-HLLHJS0J8W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export default app;
