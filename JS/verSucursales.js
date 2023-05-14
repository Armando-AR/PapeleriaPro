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

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Referencia a la base de datos
const db = getFirestore(app);

const sucursalesRef = collection(db, "Sucursales");
const queryRef = query(sucursalesRef);

const container = document.getElementById("container");

getDocs(queryRef).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const card = document.createElement("div");
    card.classList.add("card");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = "Media/pape.png";
    img.alt = "papee.png";
    figure.appendChild(img);
    card.appendChild(figure);
    const contenido = document.createElement("div");
    contenido.classList.add("contenido");
    const h3 = document.createElement("h3");
    h3.textContent = data.Nombre;
    contenido.appendChild(h3);
    const p = document.createElement("p");
    p.textContent = data.Descripcion;
    contenido.appendChild(p);
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = "Ver catálogo";
    contenido.appendChild(a);
    card.appendChild(contenido);
    container.appendChild(card);
  });
});