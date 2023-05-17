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

// Seleccion de la tabla Usuarios
const docUser = collection(db, "Clientes");
const docDir = collection(db, "Direccion");
console.log("Llega a la coleccion de clientes");

document.getElementById("regisbtn").addEventListener("click", (event) => {
  event.preventDefault(); 
  const nombreUs = document.getElementById("nombreUsuario").value;
  const apUs = document.getElementById("apUsuario").value;
  const emailUs = document.getElementById("email").value;
  const contraUs = document.getElementById("contrasenaUsuario").value;
  const rfcUs = document.getElementById("RFC").value;
  const amUs = document.getElementById("amUsuario").value;
  const calleUs = document.getElementById("calleDireccion").value;
  const cpUs = document.getElementById("cpDireccion").value;
  const noinUs = document.getElementById("noInterior").value;
  const paisUs = document.getElementById("paisDireccion").value;
  const noexUs = document.getElementById("noExterior").value;
  const estadoUs = document.getElementById("estado").value;

  setDoc(doc(docUser), {
    ApellidoMCliente : amUs,
    ApellidoPCliente : apUs,
    EmailCliente : emailUs,
    NombreCliente : nombreUs,
    PassCliente : contraUs,
    RFC : rfcUs,
  }).then(() => {
    console.log("Se ha registrado el cliente");
  }).catch((error) => {
    console.error("Error al ingresar los datos del cliente:", error);
  });

  setDoc(doc(docDir), {
    Calle : calleUs,
    CoPost : cpUs,
    Estado : estadoUs,
    NumExt : noexUs,
    NumInt : noinUs,
    Pais : paisUs,

  }).then(() => {
    console.log("Se ha registrado la direccion");
  }).catch((error) => {
    console.error("Error al ingresar los datos de la direccion:", error);
  });
});