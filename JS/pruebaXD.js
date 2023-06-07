/*import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
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
  //firebase.initializeApp(firebaseConfig);

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Referencia a la base de datos
const db = getFirestore(app);

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
  });*/


  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  onSnapshot
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

//const taskContainer = document.getElementById("search-results");
const taskContainer = document.getElementById("productos-container");

const onGetTask = (callback) => onSnapshot(collection(db, 'Productos'), callback)

window.addEventListener('DOMContentLoaded', async () => {
    onGetTask((querySnapshot) =>{
        let html = ''
    querySnapshot.forEach(doc => {
        const task = doc.data()
        console.log(doc.data());
        html += `
            <div class="result-item">
                <h4>${task.Nombre}</h4>
                <p class="precio_unitario_lista">Precio unitario: $${task.PrecioMayoreo}</p>
                <p class="inventario_lista">Existencia: ${task.Existencia}</p>
                <button id="add_2_kart"  class="btn btn-primary btn-sm add-to-cart-button">Agregar
                    a la venta</button>
            </div>
        `
    })
    taskContainer.innerHTML =html
    })
})

  
  
  