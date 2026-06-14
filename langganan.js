import { db } from "firebase.js";

import {
collection,
addDoc,
getDocs,
updateDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const subRef = collection(db,"subscriptions");

/* ======================
CEK STATUS LANGGANAN
====================== */

async function cekLangganan(){

try{

const snap = await getDocs(subRef);

let dataUser = null;

snap.forEach(d=>{
dataUser = { id:d.id, ...d.data() };
});

/* kalau belum ada data → buat trial otomatis */
if(!dataUser){

await addDoc(subRef,{
paket:"trial",
start:new Date(),
durasiHari:2,
status:"aktif"
});

location.reload();
return;

}

const start = dataUser.start?.seconds
? dataUser.start.seconds*1000
: new Date(dataUser.start).getTime();

const now = new Date().getTime();

const selisihHari =
Math.floor((now - start)/(1000*60*60*24));

let sisa = 2 - selisihHari;

const statusEl = document.getElementById("statusLangganan");
const sisaEl = document.getElementById("sisaHari");

if(sisa <= 0){

sisa = 0;

statusEl.innerHTML = "EXPIRED - Wajib Upgrade";
statusEl.style.color = "red";

}else{

statusEl.innerHTML = dataUser.paket.toUpperCase();
statusEl.style.color = "green";

}

if(sisaEl){
sisaEl.innerHTML = sisa + " Hari";
}

}catch(error){

console.error("Error langganan:",error);

}

}

/* ======================
UPGRADE PAKET
====================== */

window.upgradePro = async function(){

try{

await addDoc(subRef,{
paket:"pro",
start:new Date(),
status:"aktif"
});

alert("Berhasil upgrade ke PRO");

location.reload();

}catch(error){

console.error(error);

}

};

window.upgradeBisnis = async function(){

try{

await addDoc(subRef,{
paket:"bisnis",
start:new Date(),
status:"aktif"
});

alert("Berhasil upgrade ke BISNIS");

location.reload();

}catch(error){

console.error(error);

}

};

/* ======================
LOAD AWAL
====================== */

cekLangganan();
