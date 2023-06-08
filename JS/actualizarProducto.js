import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc
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



// Seleccion de la tabla de Productos
const collectionRef = collection(db, "Productos");
var IdProducto = 4444941;
const urlParams = new URLSearchParams(window.location.search);
IdProducto = parseInt(urlParams.get('id'));
console.log(IdProducto);
const querySelection = query(collectionRef, where("IdProducto", "==", IdProducto));

getDocs(querySelection).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    const data = doc.data();
    document.getElementById("precioMayProducto").value = data.PrecioMayoreo;
    document.getElementById("nombreProducto").value = data.Nombre;
    document.getElementById("precioMenProducto").value = data.PrecioUnitario;
    document.getElementById("desProducto").value = data.Descripcion;
    document.getElementById("existenciaProducto").value = data.Existencia;
  });
});

// Actualizar
const actualizarBtn = document.getElementById("actualizarBtn");
actualizarBtn.addEventListener("click", () => {
  const precioMayoreo = document.getElementById("precioMayProducto").value;
  const nombre = document.getElementById("nombreProducto").value;
  const precioUnitario = document.getElementById("precioMenProducto").value;
  const descripcion = document.getElementById("desProducto").value;
  const existencia = document.getElementById("existenciaProducto").value;

  const updatedData = {
    PrecioMayoreo: precioMayoreo,
    Nombre: nombre,
    PrecioUnitario: precioUnitario,
    Descripcion: descripcion,
    Existencia: existencia
  };
  const collectionRef = collection(db, "Productos");
  const querySelection = query(collectionRef, where("IdProducto", "==", IdProducto));
  getDocs(querySelection)
    .then((querySnapshot) => {
      querySnapshot.forEach((queryDocumentSnapshot) => {
        const docRef = doc(db, "Productos", queryDocumentSnapshot.id);
        updateDoc(docRef, updatedData)
          .then(() => {
            console.log("Datos actualizados con éxito en Firebase");
          })
          .catch((error) => {
            console.error("Error al actualizar los datos en Firebase:", error);
          });
      });
    })
    .catch((error) => {
      console.error("Error al obtener el producto de Firebase:", error);
    });
});


