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

//Seleccion de la tabla de Clientes
const collectionRef = collection(db, "Clientes");

// Seleccion de usuario
var IdUsuario = 104;

//Query para seleccionar los datos del Usuario 104
const querySelection = query(
  collectionRef,
  where("IdCliente", "==", IdUsuario)
);

// Obtener datos de Cliente y registrarlos en el formulario
getDocs(querySelection).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    var data = doc.data();
    document.getElementById("nombreUsuario").value = data.NombreCliente;
    document.getElementById("apUsuario").value = data.ApellidoPCliente;
    document.getElementById("amUsuario").value = data.ApellidoMCliente;
    document.getElementById("email").value = data.EmailCliente;
    document.getElementById("contrasenaUsuario").value = data.PassCliente;
    document.getElementById("confcontra").value = data.PassCliente;
    document.getElementById("RFC").value = data.RFC;
    document.getElementById("noTelefono").value = data.TelCliente;
  });
});

//Selecciona la tabla Direccion
const collectionDir = collection(db, "Direccion");

//Valor para asignar los datos de la direccion
var IdDireccion = 104;
const querySelectionDir = query(
  collectionDir,
  where("IdDireccion", "==", IdDireccion)
);

getDocs(querySelectionDir).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    var data = doc.data();
    var pais = data.Pais;
    var select = document.getElementById("paisDireccion");
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].value == pais) {
        select.selectedIndex = i;
        break;
      }
    }
    document.getElementById("noInterior").value = data.NumInt;
    document.getElementById("cpDireccion").value = data.CoPost;
    document.getElementById("calleDireccion").value = data.Calle;
  });
});

// Selección de la tabla Usuarios
const docUser = doc(db, "Clientes", IdUsuario);

// Selección de la tabla Dirección
const docDir = doc(db, "Direccion", IdDireccion); 

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