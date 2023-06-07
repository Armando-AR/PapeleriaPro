
//Random para numero de factura
var randomId = Math.floor(Math.random() * 900000) + 100000;

//obtener fecha actual
var dates = new Date(Date.now());

//Fragmentacion de fecha
var hora = dates.getHours() + ":" + dates.getMinutes();
let date = dates.getDate() + "-" + (dates.getMonth()+1) + "-" + dates.getFullYear();

//Asignar id al documento
document.getElementById("inputNumFactura").value = randomId;

//Asignar fecha actual al documento
document.getElementById("inputFechaEmision").value = date + " " + hora;

//Elemento del cliente
//document.getElementById("inputNombreCliente").value;
//document.getElementById("inputDireccion").value;
//document.getElementById("inputRFC").value;


//Fecha nueva para vencimiento de factura (15 dias)
const feVen = addDays(dates, 14)
var horaVen = feVen.getHours() + ":" + feVen.getMinutes();
let dateVen = feVen.getDate() + "-" + (feVen.getMonth()+1) + "-" + feVen.getFullYear();

//Asignando fecha maxima al documento
document.getElementById("inputFechaVencimiento").value = dateVen + " " + horaVen

//Variable para subtotal
let subtotal = 0;

let Realsub;

var cal;
//contenedor para la lista de productos
const taskContainer = document.getElementById("totalProd");
let html = '';

//Boton para añadir el producto a la lista
document.getElementById("addProd").addEventListener("click", (event) => {
    event.preventDefault();

    var cantidad = document.getElementById("inputCantidad").value;
    var precio = document.getElementById("inputPrecio").value;
    var pProd = cantidad * precio;

    html += `
                <tr scope="row">
                    <td >${document.getElementById("inputDescripcion").value}</td>
                    <td>${cantidad}</td>
                    <td>${precio}</td>
                    <td><input type="text" id="inputTotal" class="form-control" readonly value="${pProd}"></td>
                </tr>
            `;
    //console.log(html)
    subtotal += pProd;
    Realsub = subtotal;
    taskContainer.innerHTML = html
    document.getElementById("inputSubtotal").value = subtotal
});

document.getElementById("calculo").addEventListener("click", (event) => {
    event.preventDefault();
    cal = Realsub + Number(document.getElementById("inputImpuestos").value) - Number(document.getElementById("inputDescuentos").value);
    console.log(cal)
    document.getElementById("inputTotalFinal").value = cal;
});


document.getElementById("btnFactura").addEventListener("click", (event) => {
    event.preventDefault();
    alert("Enviando factura a tu correo");
    console.log(document.getElementById("inputRFC").value)
    var correo = document.getElementById("correoCliente").value;
    Email.send({
        SecureToken : "48bb16eb-a5a1-4e95-b9e0-a9ccda5e6565",
        To : correo,
        From : "armando.ar99@gmail.com",
        Subject : "This is the subject",
        Body : "Datos ingresados:\n"+
            "Nombre Cliente: " + document.getElementById("inputNombreCliente").value
            +"\nDireccion: " + document.getElementById("inputDireccion").value
            +"\n RFC: "+ document.getElementById("inputRFC").value
            +"\n Numero de factura: " + document.getElementById("inputNumFactura").value
            +"\n Fecha de emisión de factura: " + document.getElementById("inputFechaEmision").value
            +"\n Fecha de vencimiento de factura: " + document.getElementById("inputFechaVencimiento").value
            +"\n Términos de pago: " + document.getElementById("selectTerminosPago").value
            + "\n TOTAL: " + cal
    }).then(
      message => alert(message)
    );

});

var  a = "7687337A14EE1C531772BAB05D088CC05645";

var secTok = "d42a56e7-9f59-48ed-a945-ac39eaeb3e67"
//Funcion para generar nueva fecha
function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}
