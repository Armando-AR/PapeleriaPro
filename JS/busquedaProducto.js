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

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const productTable = document.getElementById("product-table");

function fillProductTable(results) {
  productTable.innerHTML = `
    <tr>
      <th>ID Producto</th>
      <th>Nombre</th>
      <th>Descripcion</th>
      <th>Precio Unitario</th>
      <th>Precio mayoreo</th>
    </tr>
  `;

    results.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.IdProducto}</td>
      <td>${product.Nombre}</td>
      <td>${product.Descripcion}</td>
      <td>${product.PrecioUnitario}</td>
      <td>${product.PrecioMayoreo}</td>
    `;
    productTable.appendChild(row);
  });
}
const searchTerm = searchInput.value.trim();
  
    const q = query(docProd, where("Nombre", ">=", searchTerm), where("Nombre", "<=", searchTerm + "\uf8ff"));
    getDocs(q)
      .then((querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push(doc.data());
        });
        fillProductTable(results);
      })
      .catch((error) => {
        console.error("Error al realizar la búsqueda:", error);
      });

    searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    const q = query(docProd, where("Nombre", ">=", searchTerm), where("Nombre", "<=", searchTerm + "\uf8ff"));
    getDocs(q)
      .then((querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push(doc.data());
        });
  
        fillProductTable(results);
      })
      .catch((error) => {
        console.error("Error al realizar la búsqueda:", error);
      });
  });
  