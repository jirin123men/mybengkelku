import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const transaksiRef =
collection(db,"transactions");

/* ======================
TAMBAH TRANSAKSI
====================== */

window.tambahTransaksi =
async function(){

const pelanggan =
document.getElementById("pelanggan").value;

const jenis =
document.getElementById("jenis").value;

const biayaServis =
document.getElementById("biayaServis").value;

const biayaSparepart =
document.getElementById("biayaSparepart").value;

if(!pelanggan){

alert("Nama pelanggan wajib diisi");

return;

}

const total =
Number(biayaServis || 0) +
Number(biayaSparepart || 0);

try{

await addDoc(
transaksiRef,
{
pelanggan,
jenis,
biayaServis:Number(biayaServis),
biayaSparepart:Number(biayaSparepart),
total,
tanggal:new Date(),
createdAt:new Date()
}
);

alert("Transaksi berhasil disimpan");

document.getElementById("pelanggan").value="";
document.getElementById("jenis").value="";
document.getElementById("biayaServis").value="";
document.getElementById("biayaSparepart").value="";

loadTransaksi();

}
catch(error){

console.error(error);

alert("Gagal menyimpan transaksi");

}

};

/* ======================
LOAD DATA
====================== */

async function loadTransaksi(){

const tbody =
document.getElementById(
"tbodyTransaksi"
);

if(!tbody) return;

tbody.innerHTML="";

const snapshot =
await getDocs(
transaksiRef
);

let nomor = 1;

snapshot.forEach((item)=>{

const data =
item.data();

tbody.innerHTML += `

<tr>

<td>${nomor++}</td>

<td>${data.pelanggan || ''}</td>

<td>${data.jenis || ''}</td>

<td>Rp ${(data.biayaServis || 0).toLocaleString('id-ID')}</td>

<td>Rp ${(data.biayaSparepart || 0).toLocaleString('id-ID')}</td>

<td><b>Rp ${(data.total || 0).toLocaleString('id-ID')}</b></td>

<td>

<button
class="hapus"
onclick="hapusTransaksi('${item.id}')">

🗑️

</button>

</td>

</tr>

`;

});

const total =
document.getElementById(
"totalPendapatan"
);

if(total){

let totalPendapatan = 0;

snapshot.forEach(doc=>{

totalPendapatan += doc.data().total || 0;

});

total.innerHTML =
"Rp " +
totalPendapatan.toLocaleString("id-ID");

}

}

/* ======================
HAPUS TRANSAKSI
====================== */

window.hapusTransaksi =
async function(id){

if(!confirm(
"Hapus transaksi ini?"
)) return;

try{

await deleteDoc(
doc(
db,
"transactions",
id
)
);

loadTransaksi();

}
catch(error){

console.error(error);

}

};

/* ======================
PENCARIAN
====================== */

window.cariTransaksi =
function(){

const keyword =
document
.getElementById("search")
.value
.toLowerCase();

const rows =
document.querySelectorAll(
"#tbodyTransaksi tr"
);

rows.forEach(row=>{

row.style.display =
row.innerText
.toLowerCase()
.includes(keyword)
? ""
: "none";

});

};

/* ======================
LOAD AWAL
====================== */

loadTransaksi();
