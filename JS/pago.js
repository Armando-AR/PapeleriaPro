

let efe = false

let tipoPago = ''

function selectPaymentOption(option) {
  var options = document.getElementsByClassName("payment-option");
  var checkboxes = document.getElementsByClassName("payment-checkbox");

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
  option.getElementsByClassName("payment-checkbox")[0].checked = true;

  var fields = document.getElementById("credit-card-fields");

  fields.style.display = option.id === "credit-card-option" ? "block" : "none";

    efe = document.getElementById("efectivo");
}


document.getElementById("btnPagar").addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Pagando")
    if(efe.checked){
        console.log("Pagando en efectivo")
        alert("Codigo generado para pagar en sucursal " + genRanHex(12))
        tipoPago = "efectivo"
    }else{
        console.log("Pagando en con tarjeta")
        alert("Pago generado con tarjeta")
        tipoPago = "tarjeta"
    }



});

const genRanHex = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
