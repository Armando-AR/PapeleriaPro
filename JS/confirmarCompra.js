import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  getDocs,
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

async function cargarProductosDelCarrito() {
  const idCarrito = 30;

  // Actualizar el ID del carrito en el HTML
  document.getElementById("idcarrito").textContent = `ID del Carrito: ${idCarrito}`;

  const carritoQuerySnapshot = await getDocs(
    query(collection(db, "Carrito"), where("idcarrito", "==", idCarrito))
  );

  if (!carritoQuerySnapshot.empty) {
    const carritoDocSnapshot = carritoQuerySnapshot.docs[0];
    const carritoDocRef = carritoDocSnapshot.ref;

    const productosQuerySnapshot = await getDocs(collection(carritoDocRef, "productos"));

    if (!productosQuerySnapshot.empty) {
      let tableHTML = "";
      let totalMonto = 0;

      productosQuerySnapshot.forEach((doc) => {
        const producto = doc.data();
        const cantidad = producto.cantidad;
        const nombre = producto.nombre;
        const precioUnitario = producto.preciounitario;
        const monto = cantidad * precioUnitario;
        const rowHTML = `
          <tr>
            <td>${cantidad}</td>
            <td>${nombre}</td>
            <td>$${precioUnitario}</td>
            <td>$${monto}</td>
          </tr>
        `;

        tableHTML += rowHTML;
        totalMonto += monto;
      });
      document.getElementById("idtabla").innerHTML = `
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Producto</th>
            <th>Precio Unitario</th>
            <th>Monto por Producto</th>
          </tr>
        </thead>
        <tbody>
          ${tableHTML}
        </tbody>
      `;
      document.getElementById("total-amount").textContent = `$${totalMonto.toFixed(2)}`;
    } else {
      console.log("No se encontraron productos dentro del carrito.");
    }
  } else {
    console.log(`No se encontró el carrito con idcarrito = ${idCarrito}.`);
  }
}

cargarProductosDelCarrito();