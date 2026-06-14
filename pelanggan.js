import { db } from "firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const pelangganRef = collection(db,"customers");

/* =====================
TAMBAH PELANGGAN
===================== */

window.tambahPelanggan = async function(){

const nama =
document.getElementById("nama").value;

const telepon =
document.getElementById("telepon").value;

const email =
document.getElementById("email").value;

const kendaraan =
document.getElementById("kendaraan").value;

const alamat =
document.getElementById("alamat").value;

if(!nama){

alert("Nama pelanggan wajib diisi");

return;

}

try{

await addDoc(
pelangganRef,
{
nama,
telepon,
email,
kendaraan,
alamat,
createdAt:new Date()
}
);

alert("Pelanggan berhasil ditambahkan");

document.getElementById("nama").value="";
document.getElementById("telepon").value="";
document.getElementById("email").value="";
document.getElementById("kendaraan").value="";
document.getElementById("alamat").value="";

loadPelanggan();

}catch(error){

console.error(error);

alert("Gagal menyimpan data");

}

};

/* =====================
TAMPILKAN DATA
===================== */

async function loadPelanggan(){

const tbody =
document.getElementById(
"tbodyPelanggan"
);

if(!tbody) return;

tbody.innerHTML = "";

const snapshot =
await getDocs(pelangganRef);

let nomor = 1;

snapshot.forEach((item)=>{

const data = item.data();

tbody.innerHTML += `

<tr>

<td>${nomor++}</td>

<td>${data.nama || ''}</td>

<td>${data.telepon || ''}</td>

<td>${data.email || ''}</td>

<td>${data.kendaraan || ''}</td>

<td>

<button
class="hapus"
onclick="hapusPelanggan('${item.id}')">

🗑️

</button>

</td>

</tr>
`;

});

const total =
document.getElementById(
"totalPelanggan"
);

if(total){

total.innerHTML =
snapshot.size;

}

}

/* =====================
HAPUS PELANGGAN
===================== */

window.hapusPelanggan =
async function(id){

if(!confirm(
"Hapus pelanggan ini?"
)) return;

try{

await deleteDoc(
doc(db,"customers",id)
);

loadPelanggan();

}catch(error){

console.error(error);

}

};

/* =====================
PENCARIAN
===================== */

window.cariPelanggan =
function(){

const keyword =
document
.getElementById("search")
.value
.toLowerCase();

const rows =
document.querySelectorAll(
"#tbodyPelanggan tr"
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

/* =====================
LOAD AWAL
===================== */

loadPelanggan();
