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

// Referencia al documento del carrito con idcarrito = 30
const carritoQuerySnapshot = await getDocs(query(collection(db, "Carrito"), where("idcarrito", "==", 30)));

if (!carritoQuerySnapshot.empty) {
  const carritoDocSnapshot = carritoQuerySnapshot.docs[0];
  const carritoDocRef = carritoDocSnapshot.ref;

  const productosQuerySnapshot = await getDocs(collection(carritoDocRef, "productos"));

  if (!productosQuerySnapshot.empty) {
    let tableHTML = "";

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
          <td class="td_del"><a class="boton-personalizado" id="eliminarBtn" data-producto-id="${doc.id}" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
          </svg></a></td>
        </tr>
      `;
      
      tableHTML += rowHTML;
    });
    // Agrega el evento de clic al botón "Eliminar" después de generar el HTML de los productos
    const eliminarBtns = document.querySelectorAll("#eliminarBtn");
    eliminarBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const productoId = btn.getAttribute("data-producto-id");
        eliminarProducto(productoId);
      });
    });

    
    document.getElementById("cart-products").innerHTML = `
      <table id="tablaCarrito">
        <tr>
          <th>Cantidad</th>
          <th>Producto</th>
          <th>Precio unitario</th>
          <th>Monto</th>
          <th>Eliminar</th>
        </tr>
        ${tableHTML}
      </table>
    `;
  } else {
    console.log("No se encontraron productos dentro del carrito.");
  }
} else {
  console.log("No se encontró el carrito con idcarrito = 30.");
}


async function cargarProductosDelCarrito() {
    const carritoQuerySnapshot = await getDocs(query(collection(db, "Carrito"), where("idcarrito", "==", 30)));
  
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
              <td class="td_del"><a class="boton-personalizado" id="eliminarBtn" href="#" data-producto-id="${producto.idproducto}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
              </svg></a></td>
            </tr>
          `;
  
          tableHTML += rowHTML;
          totalMonto += monto;
        });
        document.getElementById("cart-products").innerHTML = `
          <table id="tablaCarrito">
            <tr>
              <th>Cantidad</th>
              <th>Producto</th>
              <th>Precio unitario</th>
              <th>Monto</th>
              <th>Eliminar</th>
            </tr>
            ${tableHTML}
          </table>
        `;
        document.getElementById("total-amount").innerHTML = `
          <h3>Total de la Compra: $${totalMonto.toFixed(2)}</h3>
        `;
      } else {
        console.log("No se encontraron productos dentro del carrito.");
      }
    } else {
      console.log("No se encontró el carrito con idcarrito = 30.");
    }
  }

  async function eliminarProducto(idProducto) {
    try {
      const carritoQuerySnapshot = await getDocs(query(collection(db, "Carrito"), where("idcarrito", "==", 30)));
  
      if (!carritoQuerySnapshot.empty) {
        const carritoDocSnapshot = carritoQuerySnapshot.docs[0];
        const carritoDocRef = carritoDocSnapshot.ref;
        const productosCollectionRef = collection(carritoDocRef, "productos");
  
        // Buscar el documento del producto por el campo "idproducto"
        const querySnapshot = await getDocs(query(productosCollectionRef, where("idproducto", "==", idProducto)));
  
        if (!querySnapshot.empty) {
          const productoDocSnapshot = querySnapshot.docs[0];
          const productoDocRef = productoDocSnapshot.ref;
  
          await deleteDoc(productoDocRef);
  
          // Vuelve a cargar los productos del carrito para actualizar la lista
          cargarProductosDelCarrito();
        } else {
          console.log("No se encontró el producto con el ID:", idProducto);
        }
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }
  async function asignarEventosEliminar() {
    const eliminarBtns = document.querySelectorAll("#eliminarBtn");
    eliminarBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const productoId = btn.getAttribute("data-producto-id");
        console.log("ID del producto a eliminar:", productoId);
        eliminarProducto(productoId);
      });
    });
  }
  
  (async () => {
    await cargarProductosDelCarrito();
    await asignarEventosEliminar();
  })();
  cargarProductosDelCarrito();