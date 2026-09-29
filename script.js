// ========================================
// SATOSHI STORE - MAIN JAVASCRIPT
// ========================================


// ========================================
// PRODUCT PRICE CHANGES
// ========================================

// LOUD
const loudSize = document.getElementById("loudSize");
const loudPrice = document.getElementById("loudPrice");

const loudPrices = {
    Small: 10000,
    Medium: 12000,
    Large: 14000,
    XL: 16000
};

if (loudSize && loudPrice) {
    loudSize.addEventListener("change", function () {
        loudPrice.textContent =
            Number(loudPrices[this.value]).toLocaleString();
    });
}


// ========================================
// CLASSIC BACKWOODS
// ========================================

const backwoodsSize =
    document.getElementById("backwoodsSize");

const backwoodsPrice =
    document.getElementById("backwoodsPrice");

const backwoodsPrices = {
    Small: 8000,
    Medium: 10000,
    Large: 12000
};

if (backwoodsSize && backwoodsPrice) {
    backwoodsSize.addEventListener("change", function () {
        backwoodsPrice.textContent =
            Number(backwoodsPrices[this.value]).toLocaleString();
    });
}


// ========================================
// CLASSIC SCOTTISH
// ========================================

const scottishSize =
    document.getElementById("scottishSize");

const scottishPrice =
    document.getElementById("scottishPrice");

const scottishPrices = {
    Small: 35000,
    Medium: 37000,
    Large: 39000
};

if (scottishSize && scottishPrice) {
    scottishSize.addEventListener("change", function () {
        scottishPrice.textContent =
            Number(scottishPrices[this.value]).toLocaleString();
    });
}


// ========================================
// CART
// ========================================

let cart = [];

const addButtons =
    document.querySelectorAll(".add-cart");

const cartCount =
    document.getElementById("cartCount");

const cartButton =
    document.getElementById("cartButton");

const cartPanel =
    document.getElementById("cartPanel");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");


// ========================================
// ADD TO CART
// ========================================

addButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard =
            button.closest(".product-card");

        const productName =
            productCard
                .querySelector("h3")
                .textContent
                .trim();

        const priceElement =
            productCard.querySelector("h4 span");

        if (!priceElement) {

            console.error(
                "Price span not found for:",
                productName
            );

            return;
        }

        const price =
            Number(
                priceElement.textContent
                    .replace(/[₦,]/g, "")
            );


        // Find selected options

        const selects =
            productCard.querySelectorAll(
                ".product-option"
            );

        let size = "";
        let color = "";


        selects.forEach((select) => {

            if (
                select.id
                    .toLowerCase()
                    .includes("size")
            ) {
                size = select.value;
            }

            if (
                select.id
                    .toLowerCase()
                    .includes("color")
            ) {
                color = select.value;
            }

        });


        // Check if same product + options already exists

        const existingProduct =
            cart.find((item) =>

                item.name === productName &&
                item.size === size &&
                item.color === color

            );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                name: productName,

                price: price,

                size: size,

                color: color,

                quantity: 1

            });

        }


        updateCart();


        // Button feedback

        button.textContent =
            "Added ✓";

        setTimeout(() => {

            button.textContent =
                "Add to Cart";

        }, 1000);

    });

});


// ========================================
// UPDATE CART
// ========================================

function updateCart() {

    cartItems.innerHTML = "";

    let totalItems = 0;

    let totalPrice = 0;


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    }


    // Build cart

    cart.forEach((item, index) => {

        totalItems +=
            item.quantity;

        totalPrice +=
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div>

                <h4>
                    ${item.name}
                </h4>

                ${
                    item.size
                        ? `<p>Size: ${item.size}</p>`
                        : ""
                }

                ${
                    item.color
                        ? `<p>Color: ${item.color}</p>`
                        : ""
                }

                <p>
                    ₦${item.price.toLocaleString()}
                    × ${item.quantity}
                </p>


                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-item"
                onclick="removeItem(${index})">

                Remove

            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    // Cart count

    cartCount.textContent =
        totalItems;


    // Cart total

    cartTotal.textContent =
        totalPrice.toLocaleString();


    // Checkout total

    if (checkoutTotal) {

        checkoutTotal.textContent =
            totalPrice.toLocaleString();

    }


    // Bank transfer total

    const bankTransferTotal =
        document.getElementById(
            "bankTransferTotal"
        );

    if (bankTransferTotal) {

        bankTransferTotal.textContent =
            totalPrice.toLocaleString();

    }


    // Checkout items

    const checkoutItems =
        document.getElementById(
            "checkoutItems"
        );


    if (checkoutItems) {

        checkoutItems.innerHTML = "";


        if (cart.length === 0) {

            checkoutItems.innerHTML =
                "<p>Your cart is empty.</p>";

        }


        cart.forEach((item) => {

            const checkoutItem =
                document.createElement("div");

            checkoutItem.className =
                "checkout-item";


            checkoutItem.innerHTML = `

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    ${
                        item.size
                            ? `<div>Size: ${item.size}</div>`
                            : ""
                    }

                    ${
                        item.color
                            ? `<div>Color: ${item.color}</div>`
                            : ""
                    }

                    <div>
                        Quantity: ${item.quantity}
                    </div>

                </div>


                <strong>

                    ₦${(
                        item.price *
                        item.quantity
                    ).toLocaleString()}

                </strong>

            `;


            checkoutItems.appendChild(
                checkoutItem
            );

        });

    }

}


// ========================================
// INCREASE QUANTITY
// ========================================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


// ========================================
// DECREASE QUANTITY
// ========================================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();

}


// ========================================
// REMOVE ITEM
// ========================================

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


// ========================================
// OPEN CART
// ========================================

if (cartButton && cartPanel) {

    cartButton.addEventListener(
        "click",
        () => {

            cartPanel.classList.add(
                "show"
            );

        }
    );

}


// ========================================
// CLOSE CART
// ========================================

if (closeCart && cartPanel) {

    closeCart.addEventListener(
        "click",
        () => {

            cartPanel.classList.remove(
                "show"
            );

        }
    );

}


// ========================================
// CHECKOUT
// ========================================

const checkoutButton =
    document.getElementById(
        "checkoutButton"
    );

const checkoutSection =
    document.getElementById(
        "checkout"
    );

const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );

const checkoutTotal =
    document.getElementById(
        "checkoutTotal"
    );


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty 🛒"
                );

                return;

            }


            let total = 0;


            cart.forEach((item) => {

                total +=
                    item.price *
                    item.quantity;

            });


            checkoutTotal.textContent =
                total.toLocaleString();


            const bankTransferTotal =
                document.getElementById(
                    "bankTransferTotal"
                );


            if (bankTransferTotal) {

                bankTransferTotal.textContent =
                    total.toLocaleString();

            }


            cartPanel.classList.remove(
                "show"
            );


            checkoutSection.scrollIntoView({
                behavior: "smooth"
            });

        }
    );

}


// ========================================
// WHATSAPP ORDER
// ========================================

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty 🛒"
                );

                return;

            }


            // Customer details

            const name =
                document.getElementById(
                    "customerName"
                ).value;


            const phone =
                document.getElementById(
                    "customerPhone"
                ).value;


            const address =
                document.getElementById(
                    "customerAddress"
                ).value;


            const city =
                document.getElementById(
                    "customerCity"
                ).value;


            const note =
                document.getElementById(
                    "customerNote"
                ).value;


            // Calculate total

            let total = 0;

            let orderDetails = "";


            cart.forEach((item) => {

                const itemTotal =
                    item.price *
                    item.quantity;


                total +=
                    itemTotal;


                orderDetails +=
                    `${item.name}\n`;


                if (item.size) {

                    orderDetails +=
                        `Size: ${item.size}\n`;

                }


                if (item.color) {

                    orderDetails +=
                        `Color: ${item.color}\n`;

                }


                orderDetails +=
                    `Quantity: ${item.quantity}\n`;


                orderDetails +=
                    `Price: ₦${item.price.toLocaleString()}\n`;


                orderDetails +=
                    `Subtotal: ₦${itemTotal.toLocaleString()}\n\n`;

            });


            // WhatsApp message

            const message = `

🛒 NEW ORDER - SATOSHI STORE

👤 Customer:
${name}

📞 Phone:
${phone}

📍 Delivery Address:
${address}

🏙️ City:
${city}

📝 Order Note:
${note || "None"}


📦 ORDER:

${orderDetails}

💰 TOTAL:
₦${total.toLocaleString()}


🏦 PAYMENT METHOD:
Bank Transfer

Bank: Moniepoint

Account Name:
Tsenyen Joseph Agyo

Account Number:
5889068100

Amount to Transfer:
₦${total.toLocaleString()}

The customer has indicated that they have made the transfer.

`;


            // YOUR WHATSAPP NUMBER

            const storeWhatsApp =
                "2349160108837";


            const whatsappURL =
                `https://wa.me/${storeWhatsApp}?text=${encodeURIComponent(message)}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


// ========================================
// INITIAL CART DISPLAY
// ========================================

updateCart();