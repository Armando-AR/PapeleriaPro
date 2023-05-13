import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBjYNh3o7lvIQ9e0IC7GObBYbsa0q6uPaI",
  authDomain: "papeleria-87feb.firebaseapp.com",
  projectId: "papeleria-87feb",
  storageBucket: "papeleria-87feb.appspot.com",
  messagingSenderId: "953172769653",
  appId: "1:953172769653:web:6803fe1c374296e820f13c",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Referencia a la base de datos
const db = getFirestore(app);

const docSurc = collection(db, "Sucursales");
const docDir = collection(db, "Direccion");

console.log("Llega a la coleccion de sucursales");
//Añadir producto
document.getElementById("regSuc").addEventListener("click", (event) => {
  console.log("Si entro");
  event.preventDefault(); 

  const idSuc = Math.ceil(Math.random() * 100);
  const idDir = Math.ceil(Math.random() * 100);
  const nombre = document.getElementById("nombreSucursal").value;
  const ext = document.getElementById("noExterior").value;
  const edo = document.getElementById("edoDireccion").value;
  const encargado = document.getElementById("encargadoSucursal").value;
  const int = document.getElementById("noInterior").value;
  const pais = document.getElementById("paisDireccion").value;
  const calle = document.getElementById("calleDireccion").value;
  const mun = document.getElementById("municipioDireccion").value;
  const post = document.getElementById("post").value;

  console.log(idSuc+
    "\n"+ idDir +
    "\n"+ idDir +
    "\n"+ nombre +
    "\n"+ ext +
    "\n"+ edo +
    "\n"+ encargado +
    "\n"+ int +
    "\n"+ pais +
    "\n"+ calle +
    "\n"+ mun +
    "\n"+ post);

  setDoc(doc(docSurc), {
    IdSucursal: idSuc,
    Nombre:nombre,
    Encargado: encargado
  }).then(() => {
    console.log("Se ha registrado la sucursal");
  }).catch((error) => {
    console.error("Error al ingresar los datos de la sucursal:", error);
  });

  setDoc(doc(docDir), {
    IdDireccion:idDir,
    Calle:calle,
    Ciudad:mun,
    CoPost:post,
    Estado:edo,
    NumExt: ext,
    NumInt:int,
    Pais: pais
}).then(() => {
    
  console.log("Se ha registrado la direccion");
}).catch((error) => {
  console.error("Error al ingresar los datos la direccion:", error);
});
});