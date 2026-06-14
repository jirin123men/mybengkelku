import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const servisRef =
collection(db,"services");

/* ======================
TAMBAH SERVIS
====================== */

window.tambahServis =
async function(){

const pelanggan =
document.getElementById("pelanggan").value;

const kendaraan =
document.getElementById("kendaraan").value;

const jenisServis =
document.getElementById("jenisServis").value;

const biaya =
document.getElementById("biaya").value;

const status =
document.getElementById("status").value;

if(!pelanggan){

alert("Nama pelanggan wajib diisi");

return;

}

try{

await addDoc(
servisRef,
{
pelanggan,
kendaraan,
jenisServis,
biaya:Number(biaya),
status,
tanggal:new Date(),
createdAt:new Date()
}
);

alert("Data servis berhasil disimpan");

document.getElementById("pelanggan").value="";
document.getElementById("kendaraan").value="";
document.getElementById("jenisServis").value="";
document.getElementById("biaya").value="";
document.getElementById("status").value="Proses";

loadServis();

}
catch(error){

console.error(error);

alert("Gagal menyimpan data");

}

};

/* ======================
LOAD DATA SERVIS
====================== */

async function loadServis(){

const tbody =
document.getElementById(
"tbodyServis"
);

if(!tbody) return;

tbody.innerHTML="";

const snapshot =
await getDocs(
servisRef
);

let nomor = 1;

snapshot.forEach((item)=>{

const data =
item.data();

tbody.innerHTML += `

<tr>

<td>${nomor++}</td>

<td>${data.pelanggan || ''}</td>

<td>${data.kendaraan || ''}</td>

<td>${data.jenisServis || ''}</td>

<td>Rp ${Number(data.biaya || 0).toLocaleString('id-ID')}</td>

<td>${data.status || ''}</td>

<td>

<button
class="hapus"
onclick="hapusServis('${item.id}')">

🗑️

</button>

</td>

</tr>

`;

});

const total =
document.getElementById(
"totalServis"
);

if(total){

total.innerHTML =
snapshot.size;

}

}

/* ======================
HAPUS SERVIS
====================== */

window.hapusServis =
async function(id){

if(!confirm(
"Hapus data servis ini?"
)) return;

try{

await deleteDoc(
doc(
db,
"services",
id
)
);

loadServis();

}
catch(error){

console.error(error);

}

};

/* ======================
PENCARIAN
====================== */

window.cariServis =
function(){

const keyword =
document
.getElementById("search")
.value
.toLowerCase();

const rows =
document.querySelectorAll(
"#tbodyServis tr"
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

loadServis();
