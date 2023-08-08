import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfigAuth = {
  apiKey: "AIzaSyC4TDVDk3n5Rh9aqynWtv6Yw8qDVt6utKc",

  authDomain: "speechly-4caad.firebaseapp.com",

  projectId: "speechly-4caad",

  storageBucket: "speechly-4caad.appspot.com",

  messagingSenderId: "185928818584",

  appId: "1:185928818584:web:6ae2e5397a8158ae5855ed",
};
const app = initializeApp(firebaseConfigAuth, "auth");
export const auth = getAuth(app);
export const db = getDatabase(app);
