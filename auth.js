import { auth, db } from "firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
doc,
setDoc,
getDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

window.registerUser = async function(){

const namaBengkel =
document.getElementById("namaBengkel").value;

const namaPemilik =
document.getElementById("namaPemilik").value;

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

const userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);

const user =
userCredential.user;

const trialStart =
new Date();

const trialEnd =
new Date();

trialEnd.setDate(
trialEnd.getDate()+2
);

await setDoc(
doc(db,"users",user.uid),
{
namaBengkel,
namaPemilik,
email,
status:"trial",
trialStart:trialStart.toISOString(),
trialEnd:trialEnd.toISOString()
}
);

alert("Registrasi berhasil");

location.href="login.html";

}catch(error){

alert(error.message);

}

};

window.loginUser = async function(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

const userCredential =
await signInWithEmailAndPassword(
auth,
email,
password
);

const uid =
userCredential.user.uid;

localStorage.setItem(
"uid",
uid
);

location.href=
"dashboard.html";

}catch(error){

alert("Email atau Password salah");

}

};

window.logoutUser = async function(){

await signOut(auth);

localStorage.clear();

location.href="login.html";

};
