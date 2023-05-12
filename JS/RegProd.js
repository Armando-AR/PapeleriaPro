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

//Seleccion de la tabla Productos
const docProd = collection(db, "Productos");
console.log("Llega a la coleccion de productos");
//Añadir producto
document.getElementById("regProd").addEventListener("click", (event) => {
  console.log("Si entro");
  event.preventDefault(); 
  const idProd = document.getElementById("idProducto").value;
  const mayoreo = document.getElementById("precioMayProducto").value;
  const unitario = document.getElementById("precioMenProducto").value;
  const descripcion = document.getElementById("desProducto").value;
  const nombreProd = document.getElementById("nombreProducto").value;
  const exitencia = document.getElementById("existenciaProducto").value;
  setDoc(doc(docProd), {
    IdProducto: idProd,
    Nombre: nombreProd,
    PrecioMayoreo: mayoreo,
    PrecioUnitario: unitario,
    Descripcion: descripcion,
    Existencia: exitencia
  }).then(() => {
    console.log("Se ha registrado el producto");
  }).catch((error) => {
    console.error("Error al ingresar los datos del producto:", error);
  });
});