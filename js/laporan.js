import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* ======================
LOAD LAPORAN
====================== */

async function loadLaporan(){

try{

const pelangganSnap =
await getDocs(collection(db,"customers"));

const kendaraanSnap =
await getDocs(collection(db,"vehicles"));

const servisSnap =
await getDocs(collection(db,"services"));

const transaksiSnap =
await getDocs(collection(db,"transactions"));

let totalPendapatan = 0;

const transaksiList = [];

transaksiSnap.forEach(doc=>{

const data = doc.data();

totalPendapatan += Number(data.total || 0);

transaksiList.push(data);

});

/* ======================
SET STATISTIK
====================== */

const setText = (id,value)=>{

const el = document.getElementById(id);

if(el) el.innerText = value;

};

setText("totalPelanggan", pelangganSnap.size);
setText("totalKendaraan", kendaraanSnap.size);
setText("totalServis", servisSnap.size);
setText("totalPendapatan", "Rp " + totalPendapatan.toLocaleString("id-ID"));

/* ======================
TABEL TRANSAKSI
====================== */

const tbody =
document.getElementById("tbodyLaporan");

if(tbody){

tbody.innerHTML="";

let no = 1;

transaksiList.forEach(item=>{

tbody.innerHTML += `

<tr>

<td>${no++}</td>
<td>${item.tanggal ? new Date(item.tanggal.seconds ? item.tanggal.seconds*1000 : item.tanggal).toLocaleDateString("id-ID") : "-"}</td>
<td>${item.pelanggan || "-"}</td>
<td>${item.jenis || "-"}</td>
<td>Rp ${(item.total || 0).toLocaleString("id-ID")}</td>

</tr>
`;

});

}

}catch(error){

console.error("Gagal load laporan:",error);

}

}

/* ======================
CETAK LAPORAN
====================== */

window.cetakLaporan =
function(){

window.print();

};

/* ======================
LOAD AWAL
====================== */

loadLaporan();
