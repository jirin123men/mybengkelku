import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBibUYRx-eti666t0P5B4xpgSU7WyRQPZ4",
  authDomain: "mybengkelku.firebaseapp.com",
  projectId: "mybengkelku",
  storageBucket: "mybengkelku.firebasestorage.app",
  messagingSenderId: "1041434407055",
  appId: "1:1041434407055:web:008ee7323d84ae70cf00fa"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
