import { db } from "firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const kendaraanRef =
collection(db,"vehicles");

/* ======================
TAMBAH KENDARAAN
====================== */

window.tambahKendaraan =
async function(){

const pemilik =
document.getElementById("pemilik").value;

const kendaraan =
document.getElementById("kendaraan").value;

const plat =
document.getElementById("plat").value;

const merk =
document.getElementById("merk").value;

const tahun =
document.getElementById("tahun").value;

if(!pemilik){

alert("Nama pemilik wajib diisi");

return;

}

try{

await addDoc(
kendaraanRef,
{
pemilik,
kendaraan,
plat,
merk,
tahun,
createdAt:new Date()
}
);

alert("Data kendaraan berhasil disimpan");

document.getElementById("pemilik").value="";
document.getElementById("kendaraan").value="";
document.getElementById("plat").value="";
document.getElementById("merk").value="";
document.getElementById("tahun").value="";

loadKendaraan();

}
catch(error){

console.error(error);

alert("Gagal menyimpan data");

}

};

/* ======================
TAMPILKAN DATA
====================== */

async function loadKendaraan(){

const tbody =
document.getElementById(
"tbodyKendaraan"
);

if(!tbody) return;

tbody.innerHTML="";

const snapshot =
await getDocs(
kendaraanRef
);

let nomor = 1;

snapshot.forEach((item)=>{

const data =
item.data();

tbody.innerHTML += `

<tr>

<td>${nomor++}</td>

<td>${data.pemilik || ''}</td>

<td>${data.kendaraan || ''}</td>

<td>${data.plat || ''}</td>

<td>${data.merk || ''}</td>

<td>${data.tahun || ''}</td>

<td>

<button
class="hapus"
onclick="hapusKendaraan('${item.id}')">

🗑️

</button>

</td>

</tr>

`;

});

const total =
document.getElementById(
"totalKendaraan"
);

if(total){

total.innerHTML =
snapshot.size;

}

}

/* ======================
HAPUS DATA
====================== */

window.hapusKendaraan =
async function(id){

if(!confirm(
"Hapus kendaraan ini?"
)) return;

try{

await deleteDoc(
doc(
db,
"vehicles",
id
)
);

loadKendaraan();

}
catch(error){

console.error(error);

}

};

/* ======================
PENCARIAN
====================== */

window.cariKendaraan =
function(){

const keyword =
document
.getElementById("search")
.value
.toLowerCase();

const rows =
document.querySelectorAll(
"#tbodyKendaraan tr"
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

loadKendaraan();
