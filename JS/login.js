var clientesRef = firebase.firestore().collection("Clientes");
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  var usuario = document.querySelector('input[name="USUARIO"]').value;
  var password = document.querySelector('input[name="PASSWORD"]').value;

  clientesRef
    .where("EmailCliente", "==", usuario)
    .where("PassCliente", "==", password)
    .get()
    .then(function (querySnapshot) {
      if (querySnapshot.size > 0) {
        alert("Bienvenido");
        window.location.href = "MENU.html";
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    })
    .catch(function (error) {
      alert("Ocurrió un error al buscar en la base de datos");
      console.error(error);
    });
});
