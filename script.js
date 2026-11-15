const products = [

    {
        id: 1,
        category: "men",
        brand: "Urban Style",
        name: "Slim Fit Casual Shirt",
        price: 899,
        oldPrice: 1599,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 2,
        category: "men",
        brand: "Street Mode",
        name: "Classic Denim Jacket",
        price: 1499,
        oldPrice: 2499,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 3,
        category: "women",
        brand: "Fashion Hub",
        name: "Elegant Summer Dress",
        price: 1299,
        oldPrice: 2199,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 4,
        category: "women",
        brand: "Urban Vogue",
        name: "Women's Casual Outfit",
        price: 999,
        oldPrice: 1799,
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 5,
        category: "kids",
        brand: "Little Star",
        name: "Kids Casual Wear",
        price: 699,
        oldPrice: 1199,
        image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 6,
        category: "beauty",
        brand: "Glow Beauty",
        name: "Beauty Essentials",
        price: 599,
        oldPrice: 899,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 7,
        category: "women",
        brand: "Modern Look",
        name: "Fashion Top",
        price: 799,
        oldPrice: 1399,
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 8,
        category: "men",
        brand: "Classic Wear",
        name: "Premium Casual Shirt",
        price: 1099,
        oldPrice: 1899,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"
    }

];


let cart = [];

let currentCategory = "all";


const productGrid =
    document.getElementById("productGrid");


const searchInput =
    document.getElementById("searchInput");


const sortSelect =
    document.getElementById("sortSelect");


const cartCount =
    document.getElementById("cartCount");


const cartPanel =
    document.getElementById("cartPanel");


const overlay =
    document.getElementById("overlay");


const cartItems =
    document.getElementById("cartItems");


const cartTotal =
    document.getElementById("cartTotal");


/* DISPLAY PRODUCTS */

function displayProducts(list) {

    productGrid.innerHTML = "";

    if (list.length === 0) {

        productGrid.innerHTML =
            "<h3>No products found.</h3>";

        return;
    }


    list.forEach(product => {

        const discount =
            Math.round(
                ((product.oldPrice - product.price)
                / product.oldPrice) * 100
            );


        const card = document.createElement("div");

        card.className = "product";


        card.innerHTML = `

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
            >

            <button
                class="wishlist"
                onclick="addWishlist(${product.id})"
            >
                ♡
            </button>

            <div class="product-info">

                <div class="brand">
                    ${product.brand}
                </div>

                <div class="product-name">
                    ${product.name}
                </div>

                <div>

                    <span class="price">
                        ₹${product.price}
                    </span>

                    <span class="old-price">
                        ₹${product.oldPrice}
                    </span>

                    <span class="discount">
                        ${discount}% OFF
                    </span>

                </div>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    ADD TO BAG
                </button>

            </div>
        `;


        productGrid.appendChild(card);

    });

}


/* FILTER */

function filterProducts() {

    let filtered = [...products];


    if (currentCategory !== "all") {

        filtered =
            filtered.filter(
                product =>
                    product.category === currentCategory
            );

    }


    const search =
        searchInput.value.toLowerCase().trim();


    if (search) {

        filtered =
            filtered.filter(product =>

                product.name
                    .toLowerCase()
                    .includes(search)

                ||

                product.brand
                    .toLowerCase()
                    .includes(search)

            );

    }


    if (sortSelect.value === "low") {

        filtered.sort(
            (a, b) => a.price - b.price
        );

    }


    if (sortSelect.value === "high") {

        filtered.sort(
            (a, b) => b.price - a.price
        );

    }


    displayProducts(filtered);

}


/* CATEGORY CLICK */

document
    .querySelectorAll("[data-category]")
    .forEach(button => {

        button.addEventListener("click", function(e) {

            e.preventDefault();

            currentCategory =
                this.dataset.category;

            filterProducts();

            window.scrollTo({
                top: document
                    .querySelector(".products-section")
                    .offsetTop - 80,

                behavior: "smooth"
            });

        });

    });


/* SEARCH */

searchInput.addEventListener(
    "input",
    filterProducts
);


/* SORT */

sortSelect.addEventListener(
    "change",
    filterProducts
);


/* ADD CART */

function addToCart(id) {

    const product =
        products.find(p => p.id === id);


    cart.push(product);

    updateCart();

    openCart();

}


/* UPDATE CART */

function updateCart() {

    cartCount.textContent =
        cart.length;


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your bag is empty.</p>";

        cartTotal.textContent = "0";

        return;
    }


    let total = 0;


    cart.forEach((product, index) => {

        total += product.price;


        const item =
            document.createElement("div");


        item.className = "cart-item";


        item.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <strong>
                    ${product.brand}
                </strong>

                <p>
                    ${product.name}
                </p>

                <strong>
                    ₹${product.price}
                </strong>

                <br>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(item);

    });


    cartTotal.textContent = total;

}


/* REMOVE */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* OPEN CART */

function openCart() {

    cartPanel.classList.add("active");

    overlay.classList.add("active");

}


/* CLOSE CART */

function closeCart() {

    cartPanel.classList.remove("active");

    overlay.classList.remove("active");

}


document
    .getElementById("cartBtn")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCart
    );


overlay.addEventListener(
    "click",
    closeCart
);


/* WISHLIST */

function addWishlist(id) {

    alert(
        "Product added to your wishlist ❤️"
    );

}


/* SHOP NOW */

document
    .getElementById("shopNow")
    .addEventListener(
        "click",
        function() {

            document
                .querySelector(".products-section")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* INITIAL LOAD */

displayProducts(products);