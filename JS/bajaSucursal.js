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
  onSnapshot,
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
const getProductos = () => getDocs(collection(db, "Sucursales"));

const deleteTask = (id) => deleteDoc(doc(db, "Sucursales", id));

const taskContainer = document.getElementById("list-container");

const onGetTask = (callback) =>
  onSnapshot(collection(db, "Sucursales"), callback);

window.addEventListener("DOMContentLoaded", async () => {
  onGetTask((querySnapshot) => {
    let html = "";
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      console.log(doc.data());
      html += `
        <div class="card">
            <figure>
                <img src="./Media/pape.png">
            </figure>
            <div class="contenido">
                <h3>${task.Nombre}</h3>
                <p>${task.Descripcion}</p>
                <a class="btn-delete" data-id = "${doc.id}">Borrar</a>
            </div>
        </div>
        `;
    });
    taskContainer.innerHTML = html;

    const borrarBoton = taskContainer.querySelectorAll(".btn-delete");

    borrarBoton.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteTask(dataset.id);
      });
    });
  });
});
