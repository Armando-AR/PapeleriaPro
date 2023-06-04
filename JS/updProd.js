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

const taskContainer = document.getElementById("list-container");

const onGetTask = (callback) => onSnapshot(collection(db, 'Productos'), callback)

window.addEventListener('DOMContentLoaded', async () => {
    onGetTask((querySnapshot) =>{
        let html = ''
    html += `
        <tr class="HEADERS">
            <th>ID Producto</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Precio Unitario</th>
            <th>Precio mayoreo</th>
            <th>Editar</th>
        </tr>
        `
    querySnapshot.forEach(doc => {
        const task = doc.data()
        console.log(doc.data());
        html += `
            <tr>
                <th>${task.IdProducto}</th>
                <th>${task.Nombre}</th>
                <th>${task.Descripcion}</th>
                <th>${task.PrecioUnitario}</th>
                <th>${task.PrecioMayoreo}</th>
                <th><a class="boton-personalizado" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                </svg></a></th>
            </tr>
            <!-- Este último th es para el botón de editar. Se supone que hace un redireccionamiento a la página de actualizarProducto.html con los datos que este campo tiene -->
        `
    })
    taskContainer.innerHTML =html

    const borrarBoton = taskContainer.querySelectorAll('.btn-delete')

    borrarBoton.forEach(btn => {
        btn.addEventListener('click', ({target: {dataset}}) => {
            console.log(dataset.id)
        })
    })

    })
})
