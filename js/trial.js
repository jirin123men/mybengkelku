import { db } from "./firebase.js";

import {
doc,
getDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const uid =
localStorage.getItem("uid");

if(!uid){

location.href="login.html";

}

const userDoc =
await getDoc(
doc(db,"users",uid)
);

const userData =
userDoc.data();

const trialEnd =
new Date(
userData.trialEnd
);

const today =
new Date();

if(today > trialEnd){

alert(
"Masa trial sudah habis"
);

location.href=
"langganan.html";

}
