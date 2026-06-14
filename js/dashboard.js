import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

async function loadDashboard(){

try{

const pelangganSnapshot =
await getDocs(collection(db,"customers"));

const kendaraanSnapshot =
await getDocs(collection(db,"vehicles"));

const servisSnapshot =
await getDocs(collection(db,"services"));

const transaksiSnapshot =
await getDocs(collection(db,"transactions"));

let totalPendapatan = 0;

transaksiSnapshot.forEach(doc=>{

const data = doc.data();

totalPendapatan += Number(
data.total || 0
);

});

const pelangganEl =
document.getElementById("totalPelanggan");

const kendaraanEl =
document.getElementById("totalKendaraan");

const servisEl =
document.getElementById("totalServis");

const pendapatanEl =
document.getElementById("totalPendapatan");

if(pelangganEl)
pelangganEl.innerHTML =
pelangganSnapshot.size;

if(kendaraanEl)
kendaraanEl.innerHTML =
kendaraanSnapshot.size;

if(servisEl)
servisEl.innerHTML =
servisSnapshot.size;

if(pendapatanEl)
pendapatanEl.innerHTML =
"Rp " +
totalPendapatan.toLocaleString("id-ID");

}
catch(error){

console.error(
"Gagal memuat dashboard:",
error
);

}

}

loadDashboard();
