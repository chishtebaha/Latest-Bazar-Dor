import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBup8jiT7xD0fmQbfwIAbNzlI32TpOBccg",
  authDomain: "bazar-dor-cfcb2.firebaseapp.com",
  projectId: "bazar-dor-cfcb2",
  storageBucket: "bazar-dor-cfcb2.appspot.com",
  messagingSenderId: "448061198099",
  appId: "1:448061198099:web:de55e75a2943326cd214e6",
  measurementId: "G-8S9FN3R4V7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);