
// Agregar eventos a los botones "Agregar a la venta"
const addButtons = document.querySelectorAll(".add-to-cart-button");
addButtons.forEach(button => {
    button.addEventListener("click", addToCart);
});

function addToCart(event) {
    const resultItem = event.target.closest(".result-item");
    const itemName = resultItem.querySelector("h4").textContent;
    const itemPrice = resultItem.querySelector(".precio_unitario_lista").textContent;
    const itemQuantity = 1;

    // Verificar si el artículo ya está en el carrito
    const checkoutItems = document.querySelectorAll(".checkout-item");
    for (let i = 0; i < checkoutItems.length; i++) {
        const item = checkoutItems[i];
        const name = item.querySelector("h3").textContent;
        if (name === itemName) {
            // El artículo ya está en el carrito, no se agrega nuevamente
            return;
        }
    }

    // El artículo no está en el carrito, se agrega
    const checkoutItem = document.createElement("div");
    checkoutItem.classList.add("checkout-item");
    checkoutItem.innerHTML = `
        <div>
            <h3>${itemName}</h3>
            <p class="precio_unitario">${itemPrice}</p>
            <p class="cantidad_articulos">Cantidad: ${itemQuantity}</p>
        </div>
        <div>
            <button class="btn btn-success btn-sm increment-button">+1</button>
            <button class="btn btn-danger btn-sm decrement-button">-1</button>
            <button class="btn btn-dark btn-sm delete-button">
                <i class="fas fa-trash"></i>
                <span class="delete-button-label">Borrar</span>
            </button>
        </div>
    `;

    const checkoutContainer = document.querySelector(".checkout-container");

    // Verificar si el artículo ya está en el checkout-container
    const checkoutItemNames = checkoutContainer.querySelectorAll("h3");
    for (let i = 0; i < checkoutItemNames.length; i++) {
        const name = checkoutItemNames[i].textContent;
        if (name === itemName) {
            // El artículo ya está en el checkout-container, no se agrega nuevamente
            return;
        }
    }

    checkoutContainer.appendChild(checkoutItem);

    // Actualizar el total
    updateTotal();

    // Agregar eventos a los botones del checkout item
    const incrementButton = checkoutItem.querySelector(".increment-button");
    const decrementButton = checkoutItem.querySelector(".decrement-button");
    const deleteButton = checkoutItem.querySelector(".delete-button");

    incrementButton.addEventListener("click", incrementQuantity);
    decrementButton.addEventListener("click", decrementQuantity);
    deleteButton.addEventListener("click", deleteItem);

    // Bloquear el botón "add_2_kart"
    event.target.disabled = true;
}

function incrementQuantity(event) {
    const checkoutItem = event.target.closest(".checkout-item");
    const quantityElement = checkoutItem.querySelector(".cantidad_articulos");
    let quantity = parseInt(quantityElement.textContent.split(":")[1]);
    quantity += 1;
    quantityElement.textContent = `Cantidad: ${quantity}`;

    // Actualizar el total
    updateTotal();
}

function decrementQuantity(event) {
    const checkoutItem = event.target.closest(".checkout-item");
    const quantityElement = checkoutItem.querySelector(".cantidad_articulos");
    let quantity = parseInt(quantityElement.textContent.split(":")[1]);
    if (quantity > 1) {
        quantity -= 1;
        quantityElement.textContent = `Cantidad: ${quantity}`;
    } else {
        deleteItem(event);
    }

    // Actualizar el total
    updateTotal();
}

function deleteItem(event) {
    const checkoutItem = event.target.closest(".checkout-item");
    checkoutItem.remove();

    // Actualizar el total
    updateTotal();

    // Desbloquear el botón "add_2_kart"
    const addButtons = document.querySelectorAll(".add-to-cart-button");
    addButtons.forEach(button => {
        button.disabled = false;
    });
}

function updateTotal() {
    const checkoutItems = document.querySelectorAll(".checkout-item");
    let total = 0;

    checkoutItems.forEach(item => {
        const priceElement = item.querySelector(".precio_unitario");
        const quantityElement = item.querySelector(".cantidad_articulos");
        const price = parseFloat(priceElement.textContent.split("$")[1]);
        const quantity = parseInt(quantityElement.textContent.split(":")[1]);
        total += price * quantity;
    });

    const totalElement = document.getElementById("total_a_pagar");
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", function () {
    const amountInput = document.querySelector(".amount-input");
    const changeInput = document.querySelector(".change-input");
    const totalElement = document.getElementById("total_a_pagar");

    amountInput.addEventListener("input", function () {
        const amount = parseFloat(amountInput.value);
        const total = parseFloat(totalElement.textContent.replace("Total: $", ""));
        const change = amount - total;

        if (change >= 0) {
            changeInput.value = change.toFixed(2);
        } else {
            changeInput.value = "Monto insuficiente";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const amountInput = document.querySelector(".amount-input");
    const totalElement = document.getElementById("total_a_pagar");
    const payButton = document.querySelector(".pay-button");

    payButton.addEventListener("click", function () {
        const amount = parseFloat(amountInput.value);
        const total = parseFloat(totalElement.textContent.replace("Total: $", ""));

        if (total === 0) {
            showAlert("Carrito vacío");
            clearInputs();
        } else if (amount >= total) {
            showAlert("Compra exitosa");
            clearInputs();
            clearCart();
        } else {
            showAlert("Monto no válido");
            clearInputs();
        }
    });

    function showAlert(message) {
        window.alert(message);
    }

    function clearInputs() {
        amountInput.value = "";
    }

    function clearCart() {
        const checkoutContainer = document.querySelector(".checkout-container");
        checkoutContainer.innerHTML = "";
        totalElement.textContent = "Total: $0";

        // Desbloquear todos los botones "add_2_kart"
        const addButtons = document.querySelectorAll(".add-to-cart-button");
        addButtons.forEach(button => {
            button.disabled = false;
        });
    }
});