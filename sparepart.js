import { db } from "firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const sparepartRef =
collection(db,"spareparts");

/* ======================
TAMBAH SPAREPART
====================== */

window.tambahSparepart =
async function(){

const nama =
document.getElementById("nama").value;

const kategori =
document.getElementById("kategori").value;

const stok =
document.getElementById("stok").value;

const harga =
document.getElementById("harga").value;

if(!nama){

alert("Nama sparepart wajib diisi");

return;

}

try{

await addDoc(
sparepartRef,
{
nama,
kategori,
stok:Number(stok),
harga:Number(harga),
createdAt:new Date()
}
);

alert("Sparepart berhasil ditambahkan");

document.getElementById("nama").value="";
document.getElementById("kategori").value="";
document.getElementById("stok").value="";
document.getElementById("harga").value="";

loadSparepart();

}
catch(error){

console.error(error);

alert("Gagal menyimpan data");

}

};

/* ======================
LOAD DATA
====================== */

async function loadSparepart(){

const tbody =
document.getElementById(
"tbodySparepart"
);

if(!tbody) return;

tbody.innerHTML="";

const snapshot =
await getDocs(
sparepartRef
);

let nomor = 1;

snapshot.forEach((item)=>{

const data =
item.data();

tbody.innerHTML += `

<tr>

<td>${nomor++}</td>

<td>${data.nama || ''}</td>

<td>${data.kategori || ''}</td>

<td>${data.stok || 0}</td>

<td>
Rp ${Number(
data.harga || 0
).toLocaleString('id-ID')}
</td>

<td>

<button
class="hapus"
onclick="hapusSparepart('${item.id}')">

🗑️

</button>

</td>

</tr>

`;

});

const total =
document.getElementById(
"totalSparepart"
);

if(total){

total.innerHTML =
snapshot.size;

}

}

/* ======================
HAPUS DATA
====================== */

window.hapusSparepart =
async function(id){

if(!confirm(
"Hapus sparepart ini?"
)) return;

try{

await deleteDoc(
doc(
db,
"spareparts",
id
)
);

loadSparepart();

}
catch(error){

console.error(error);

}

};

/* ======================
PENCARIAN
====================== */

window.cariSparepart =
function(){

const keyword =
document
.getElementById("search")
.value
.toLowerCase();

const rows =
document.querySelectorAll(
"#tbodySparepart tr"
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

loadSparepart();
