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


console.log("Conectando a Firebase...");

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBjYNh3o7lvIQ9e0IC7GObBYbsa0q6uPaI",
  authDomain: "papeleria-87feb.firebaseapp.com",
  projectId: "papeleria-87feb",
  storageBucket: "papeleria-87feb.appspot.com",
  messagingSenderId: "953172769653",
  appId: "1:953172769653:web:6803fe1c374296e820f13c",
};


  // Inicializar la aplicación de Firebase
  firebase.initializeApp(firebaseConfig);

  // Obtener una referencia a la tabla "Productos" dentro de la base de datos "Papeleria"
  const productosRef = firebase.database().ref('Papeleria/Productos');

  // Leer los datos de la tabla "Productos"
  productosRef.once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      // Obtener los valores de los campos
      const nombre = childSnapshot.child('Nombre').val();
      const existencia = childSnapshot.child('Existencia').val();
      const precioUnitario = childSnapshot.child('PrecioUnitario').val();
      const descripcion = childSnapshot.child('Descripcion').val();

      // Crear un elemento para mostrar los valores
      const productoElement = document.createElement('div');
      productoElement.innerHTML = `
        <h2>${nombre}</h2>
        <p><strong>Existencia:</strong> ${existencia}</p>
        <p><strong>Precio Unitario:</strong> ${precioUnitario}</p>
        <p><strong>Descripción:</strong> ${descripcion}</p>
        <hr>
      `;

      // Agregar el elemento al contenedor
      const productosContainer = document.getElementById('productos-container');
      productosContainer.appendChild(productoElement);
    });
  });