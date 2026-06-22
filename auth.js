import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

window.register = async () => {
  const email = email.value;
  const pass = password.value;

  await createUserWithEmailAndPassword(auth, email, pass);
  alert("Register berhasil");
};

window.login = async () => {
  const email = email.value;
  const pass = password.value;

  await signInWithEmailAndPassword(auth, email, pass);
  alert("Login berhasil");
};

window.logout = async () => {
  await signOut(auth);
  alert("Logout");
};
