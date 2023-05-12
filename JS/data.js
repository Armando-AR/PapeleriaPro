import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
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
    //Se escriben en consola los datos
    console.log(doc.data());
    //Asignacion de los datos del documento a la variable data
    var data = doc.data();
    //Se obtiene el id del elemento que se va a sustituir con los datos de la tabla requerida
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

// Obtener datos de direccion y registrarlos en el formulario
getDocs(querySelectionDir).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    var data = doc.data();
    var pais = data.Pais;
    //Se obtiene la lista de paises
    var select = document.getElementById("paisDireccion");
    for (var i = 0; i < select.options.length; i++) {
      //Si los valores corresponden se hace un break de la busqueda de pais con respecto a la lista
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

document.getElementById('regisbtn').addEventListener("click", (event) => {
  event.preventDefault();
  var IdCliente = 104;
  var IdDireccion = 104;
  console.log("Actualizando datos...");

  const nombre = document.getElementById("nombreUsuario").value;
  const apellidoP = document.getElementById("apUsuario").value;
  const apellidoM = document.getElementById("amUsuario").value;
  const email = document.getElementById("email").value;
  const contrasena = document.getElementById("contrasenaUsuario").value;
  const rfc = document.getElementById("RFC").value;
  const telefono = document.getElementById("noTelefono").value;
  const pais = document.getElementById("paisDireccion").value;
  const numInt = document.getElementById("noInterior").value;
  const cp = document.getElementById("cpDireccion").value;
  const calle = document.getElementById("calleDireccion").value;

  //Se obtiene la tabla de clientes
  
  const docRef = doc(db, "Clientes", IdCliente);

  //Se actualizan los datos del cliente seleccionado
  //Donde docRef es la tabla seleccionada
  //Los demas campos son los que se modifican
  updateDoc(docRef, {
    NombreCliente: nombre,
    ApellidoPCliente: apellidoP,
    ApellidoMCliente: apellidoM,
    EmailCliente: email,
    PassCliente: contrasena,
    RFC: rfc,
    TelCliente: telefono,
  })
    .then(() => {
      console.log("Datos del cliente actualizados con éxito");
    })
    .catch((error) => {
      console.error("Error al actualizar los datos del cliente:", error);
    });

  //De igual forma se obtiene la tabla Direccion con respecto a la variable requerida
  const docDirRef = doc(db, "Direccion", IdDireccion);

  //Se actualizan los datos de direccion
  updateDoc(docDirRef, {
    Pais: pais,
    NumInt: numInt,
    CoPost: cp,
    Calle: calle,
  })
    .then(() => {
      console.log("Datos de la dirección actualizados con éxito");
    })
    .catch((error) => {
      console.error("Error al actualizar los datos de la dirección:", error);
    });
});
