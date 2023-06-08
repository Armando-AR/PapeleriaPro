// Importar las funciones necesarias de Firebase
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

//Referencia a la base de datos 
const db = getFirestore(app);

//const taskContainer = document.getElementById("search-results");
const taskContainer = document.getElementById("compra-container");

const onGetTask = (callback) => onSnapshot(collection(db, 'Compra'), callback)

window.addEventListener('DOMContentLoaded', async () => {
    onGetTask((querySnapshot) =>{
        let html = ''
    querySnapshot.forEach(doc => {
        const task = doc.data()
        console.log(doc.data());
        html += `
            <div class="result-item">
                <h4>ID compra: ${task.IdCompra}</h4>
                <p class="precio_unitario_lista">Forma de pago: ${task.FormaPago}</p>
                <p class="inventario_lista">Monto: ${task.Monto}</p>
                <br><br>
            </div>
        `
    })
    taskContainer.innerHTML =html
    })
})
