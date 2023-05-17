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

// Seleccion de la tabla de Sucursal
const collectionRef = collection(db, "Sucursales");
const IdSucursal = 2;
const querySelection = query(collectionRef, where("IdSucursal", "==", IdSucursal));

getDocs(querySelection).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    const data = doc.data();
    document.getElementById("nombreSucursal").value = data.Nombre;
    document.getElementById("encargadoSucursal").value = data.Encargado;
  });
});

const collectionRef2 = collection(db, "Direccion");
const IdDireccion = 39;
const querySelection2 = query(collectionRef2, where("IdDireccion", "==", IdDireccion));

getDocs(querySelection2).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    const data = doc.data();
    
    document.getElementById("calleDireccion").value = data.Calle;
    document.getElementById("noExterior").value = data.NumExt;
    document.getElementById("noInterior").value = data.NumInt;
    document.getElementById("municipioDireccion").value = data.MunicipioDireccion;
    document.getElementById("paisDireccion").value = data.Pais;
    document.getElementById("edo").value = data.Estado;
  });
});

// Actualizar
const actualizarBtn = document.getElementById("actualizarBtn");
actualizarBtn.addEventListener("click", () => {
  const noExterior = document.getElementById("noExterior").value;
  const noInterior = document.getElementById("noInterior").value;
  const calleDireccion = document.getElementById("calleDireccion").value;
  const municipioDireccion = document.getElementById("municipioDireccion").value;
  const paisDireccion = document.getElementById("paisDireccion").value;
  const edo = document.getElementById("edo").value;


  const updatedData = {
    NumExt: noExterior,
    NumInt: noInterior,
    Calle: calleDireccion,
    MunicipioDireccion: municipioDireccion,
    Pais: paisDireccion,
    Estado: edo
  };
  
  const collectionRef = collection(db, "Direccion");
  const querySelection = query(collectionRef, where("IdDireccion", "==", IdDireccion));
  
  getDocs(querySelection)
    .then((querySnapshot) => {
      querySnapshot.forEach((queryDocumentSnapshot) => {
        const docRef = doc(db, "Direccion", queryDocumentSnapshot.id);
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
      console.error("Error al obtener la sucursal de Firebase:", error);
    });
});

// Actualizar
actualizarBtn.addEventListener("click", () => {
  const nombreSucursal = document.getElementById("nombreSucursal").value;
  const encargadoSucursal = document.getElementById("encargadoSucursal").value;


  const updatedData = {
    Nombre: nombreSucursal,
    Encargado: encargadoSucursal,
  };
  
  const collectionRef = collection(db, "Sucursales");
  const querySelection = query(collectionRef, where("IdSucursal", "==", IdSucursal));
  
  getDocs(querySelection)
    .then((querySnapshot) => {
      querySnapshot.forEach((queryDocumentSnapshot) => {
        const docRef = doc(db, "Sucursales", queryDocumentSnapshot.id);
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
      console.error("Error al obtener la sucursal de Firebase:", error);
    });
});