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

//Seleccion de la tabla de Clientes
const getProductos = () => getDocs(collection(db, 'Productos'));

const deleteTask = (id, nombre) => {
    const confirmacion = confirm(`¿Estás seguro de que quieres eliminar este producto permanentemente?`);
    if (confirmacion) {
        deleteDoc(doc(db, 'Productos', id))
            .then(() => {
                console.log('Producto eliminado correctamente');
            })
            .catch((error) => {
                console.error('Error al eliminar el producto:', error);
            });
    }
};

const taskForm = document.getElementById("ListaDeElementos");
const taskContainer = document.getElementById("list-container");

const onGetTask = (callback) => onSnapshot(collection(db, 'Productos'), callback)

window.addEventListener('DOMContentLoaded', async () => {
    onGetTask((querySnapshot) => {
        let html = ''
        html += `
            <tr>
                <th>IdProducto</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>PrecioUnitario</th>
                <th>PrecioMayoreo</th>
                <th></th>
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
                <th> 
                    <button class="btn btn-delete btn-sm" data-id = "${doc.id}">Borrar</button>
                </th>
            </tr>
        `
        })
        taskContainer.innerHTML = html

        const borrarBoton = taskContainer.querySelectorAll('.btn-delete')

        borrarBoton.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                deleteTask(dataset.id)
            })
        })

    })
})
