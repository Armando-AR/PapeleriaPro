import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBjYNh3o7lvIQ9e0IC7GObBYbsa0q6uPaI",
    authDomain: "papeleria-87feb.firebaseapp.com",
    projectId: "papeleria-87feb",
    storageBucket: "papeleria-87feb.appspot.com",
    messagingSenderId: "953172769653",
    appId: "1:953172769653:web:6803fe1c374296e820f13c"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Referencia a la base de datos
const db = getFirestore(app);
const collectionRef = collection(db, "Clientes");

// Seleccion de usuario
var IdUsuario = 104;
const querySelection = query(collectionRef, where("IdCliente", "==", IdUsuario));

// Obtener datos y registrarlos en el formulario
getDocs(querySelection).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    var data = doc.data();
    document.getElementById("nombreUsuario").value = data.NombreCliente;
    document.getElementById("apUsuario").value = data.NombreCliente;
    document.getElementById("email").value = data.EmailCliente;
    document.getElementById("contrasenaUsuario").value = data.PassCliente;
    document.getElementById("RFC").value = data.RFC;
    document.getElementById("noTelefono").value = data.TelCliente;
  });
});

const collectionDir = collection(db, "Direccion");

// Seleccion de usuario
var IdDireccion = 104;
const querySelectionDir = query(collectionDir, where("IdDireccion", "==", IdDireccion));

// Obtener datos y registrarlos en el formulario
getDocs(querySelectionDir).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    var data = doc.data();
    document.getElementById("noInterior").value = data.NumInt;
    document.getElementById("paisDireccion").value = data.Pais;
    document.getElementById("cpDireccion").value = data.CoPost;
    document.getElementById("calleDireccion").value = data.Calle;
  });
});



