import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  updateDoc,
  getDoc,
  setDoc,
  addDoc,
  onSnapshot,
  deleteDoc
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

const onGetTask = (callback) => onSnapshot(collection(db, 'Categorias'), callback)

const editTask = id => getDoc(doc(db,"Categorias",id))

const updateTask = (id, newFields) => updateDoc(doc(db, "Categorias", id), newFields);

const taskContainer = document.getElementById("list-container");

let idCat = '';


const deleteTask = (id) => {
  const confirmacion = confirm(`¿Estás seguro de que quieres eliminar esta categoria permanentemente?`);
  if (confirmacion) {
      deleteDoc(doc(db, 'Categorias', id))
          .then(() => {
              console.log('Categoria eliminada correctamente');
          })
          .catch((error) => {
              console.error('Error al eliminar el categoria:', error);
          });
  }
};

window.addEventListener('DOMContentLoaded', async () => {
  onGetTask((querySnapshot) => {
    let html = ''
      querySnapshot.forEach(doc => {
          const task = doc.data()
          html += `
          <tr>
              <th>${task.Nombre}</th>
              <th>${task.Descripcion}</th>
              <th> 
              <button
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#editarCategoriaModal"
                data-id = "${doc.id}">
                    Editar
              </button>
              <button class="btn btn-secondary" id="eliCat" data-id = "${doc.id}">Eliminar</button>
              </th>
          </tr>
      `
      })
      taskContainer.innerHTML = html

      const borrarBoton = taskContainer.querySelectorAll('.btn-secondary')
      const editarBoton = taskContainer.querySelectorAll('.btn-primary')

      borrarBoton.forEach(btn => {
          btn.addEventListener('click', ({ target: { dataset } }) => {
              deleteTask(dataset.id)
          })
      })

      editarBoton.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const doc = await editTask(e.target.dataset.id)
          const task = doc.data()
          document.getElementById("editarNombre").value = task.Nombre;
          document.getElementById("editarDescripcion").value = task.Descripcion;
          idCat = doc.id
        })
    })

  })
})

const docCat = collection(db, "Categorias");


document.getElementById("crearCat").addEventListener("click", (event) => {
  event.preventDefault(); 
  var randomId = Math.floor(Math.random() * 900000) + 100000;
  const nombre = document.getElementById("categoriaNombre");
  const desc = document.getElementById("categoriaDescripcion");
  
  setDoc(doc(docCat), {
    IdSucursal: randomId,
    Nombre:nombre.value,
    Descripcion: desc.value
  }).then(() => {
    console.log("Se ha registrado la categoria");
  }).catch((error) => {
    console.error("Error al ingresar los datos de la categoria:", error);
  });
});


document.getElementById("editarCat").addEventListener("click", async (event) => {
  event.preventDefault(); 
  console.log(idCat);
  const editarNom=document.getElementById("editarNombre").value
  const editarDesc=document.getElementById("editarDescripcion").value

  updateTask(idCat,{
    Nombre: editarNom,
    Descripcion: editarDesc
  }).then(() => {
    console.log("Se ha actualizado la categoria");
  }).catch((error) => {
    console.error("Error al ingresar los datos de la categoria:", error);
  });
});