/* =========================================================
   AUREL E-COMMERCE
   Vanilla JavaScript
   ========================================================= */


/* =========================================================
   PRODUCT DATABASE
   ========================================================= */

const products = [
    {
        id: 1,
        name: "Chrono One",
        category: "Time",
        price: 18900,
        oldPrice: 22900,
        rating: 4.9,
        badge: "NEW",
        material: "316L Stainless Steel",
        finish: "Brushed Graphite",
        description:
            "A precision timepiece built around restrained geometry, tactile materials and a clean everyday silhouette.",
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85"
        ]
    },

    {
        id: 2,
        name: "Arc Headphones",
        category: "Audio",
        price: 14900,
        oldPrice: 17900,
        rating: 4.8,
        badge: "POPULAR",
        material: "Aluminium + Memory Foam",
        finish: "Matte Black",
        description:
            "Immersive wireless headphones combining balanced sound, soft-touch comfort and a sculptural silhouette.",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=85"
        ]
    },

    {
        id: 3,
        name: "Aero Carry",
        category: "Carry",
        price: 8900,
        oldPrice: 10900,
        rating: 4.7,
        badge: "−18%",
        material: "Recycled Technical Nylon",
        finish: "Obsidian Black",
        description:
            "A lightweight everyday carry system designed for movement, organisation and understated utility.",
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=85"
        ]
    },

    {
        id: 4,
        name: "Frame Laptop",
        category: "Tech",
        price: 47900,
        oldPrice: 54900,
        rating: 4.9,
        badge: "FEATURED",
        material: "Recycled Aluminium",
        finish: "Silver Mist",
        description:
            "A refined portable workstation focused on clarity, performance and a distraction-free visual experience.",
        images: [
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=85"
        ]
    },

    {
        id: 5,
        name: "Pulse Speaker",
        category: "Audio",
        price: 7900,
        oldPrice: 9900,
        rating: 4.6,
        badge: "−20%",
        material: "Recycled Polymer",
        finish: "Stone Grey",
        description:
            "Compact wireless sound designed to disappear into your space while filling it with rich audio.",
        images: [
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1200&q=85"
        ]
    },

    {
        id: 6,
        name: "Mono Camera",
        category: "Tech",
        price: 32900,
        oldPrice: 37900,
        rating: 4.8,
        badge: "NEW",
        material: "Aluminium + Glass",
        finish: "Graphite",
        description:
            "A compact visual tool for people who want creative control without unnecessary complexity.",
        images: [
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85"
        ]
    },

    {
        id: 7,
        name: "Axis Watch",
        category: "Time",
        price: 21900,
        oldPrice: 25900,
        rating: 4.7,
        badge: "LIMITED",
        material: "Stainless Steel",
        finish: "Silver / Black",
        description:
            "A contemporary mechanical-inspired silhouette designed around precision and visual balance.",
        images: [
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85"
        ]
    },

    {
        id: 8,
        name: "Core Pack",
        category: "Carry",
        price: 6900,
        oldPrice: 8500,
        rating: 4.6,
        badge: "−19%",
        material: "Technical Fabric",
        finish: "Deep Olive",
        description:
            "An adaptable everyday backpack with clean storage architecture and lightweight construction.",
        images: [
            "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=1200&q=85"
        ]
    }
];


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

const CART_KEY = "aurel_cart";
const WISHLIST_KEY = "aurel_wishlist";


function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
        return [];
    }
}


function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}


function getWishlist() {
    try {
        return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
    } catch {
        return [];
    }
}


function saveWishlist(list) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}


/* =========================================================
   HELPERS
   ========================================================= */

function formatPrice(price) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(price);
}


function getProduct(id) {
    return products.find(product => product.id === Number(id));
}


function showToast(message) {
    const toast = document.querySelector(".toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2400);
}


/* =========================================================
   CART
   ========================================================= */

function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.querySelectorAll(".cart-count").forEach(element => {
        element.textContent = count;
    });
}


function addToCart(productId, quantity = 1) {

    const product = getProduct(productId);

    if (!product) return;

    const cart = getCart();

    const existing = cart.find(
        item => item.id === product.id
    );

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            quantity
        });
    }

    saveCart(cart);
    updateCartCount();

    showToast(`${product.name} added to cart.`);
}


function removeFromCart(productId) {

    const cart = getCart().filter(
        item => item.id !== Number(productId)
    );

    saveCart(cart);

    renderCart();
    updateCartCount();

    showToast("Product removed.");
}


function changeCartQuantity(productId, amount) {

    const cart = getCart();

    const item = cart.find(
        cartItem => cartItem.id === Number(productId)
    );

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart(cart);

    renderCart();
    updateCartCount();
}


function clearCart() {

    saveCart([]);

    renderCart();
    updateCartCount();

    showToast("Cart cleared.");
}


function renderCart() {

    const cartItems = document.querySelector("#cartItems");
    const emptyCart = document.querySelector("#emptyCart");
    const cartLayout = document.querySelector("#cartLayout");

    if (!cartItems) return;

    const cart = getCart();

    if (cart.length === 0) {

        cartLayout.hidden = true;
        emptyCart.hidden = false;

        return;
    }

    cartLayout.hidden = false;
    emptyCart.hidden = true;

    let subtotal = 0;
    let totalQuantity = 0;

    cartItems.innerHTML = cart.map(item => {

        const product = getProduct(item.id);

        if (!product) return "";

        const itemTotal = product.price * item.quantity;

        subtotal += itemTotal;
        totalQuantity += item.quantity;

        return `
            <article class="cart-item">

                <a
                    href="product.html?id=${product.id}"
                    class="cart-item-image"
                >
                    <img
                        src="${product.images[0]}"
                        alt="${product.name}"
                    >
                </a>

                <div class="cart-item-info">

                    <span>${product.category}</span>

                    <h3>${product.name}</h3>

                    <strong>${formatPrice(product.price)}</strong>

                    <div class="cart-item-controls">

                        <button
                            type="button"
                            data-cart-minus="${product.id}"
                        >
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            type="button"
                            data-cart-plus="${product.id}"
                        >
                            +
                        </button>

                        <button
                            type="button"
                            class="remove-item"
                            data-cart-remove="${product.id}"
                        >
                            Remove
                        </button>

                    </div>

                </div>

                <strong>
                    ${formatPrice(itemTotal)}
                </strong>

            </article>
        `;

    }).join("");

    const subtotalElement =
        document.querySelector("#cartSubtotal");

    const totalElement =
        document.querySelector("#cartTotal");

    const summaryCount =
        document.querySelector("#summaryCount");

    if (subtotalElement) {
        subtotalElement.textContent = formatPrice(subtotal);
    }

    if (totalElement) {
        totalElement.textContent = formatPrice(subtotal);
    }

    if (summaryCount) {
        summaryCount.textContent =
            `${totalQuantity} ${totalQuantity === 1 ? "item" : "items"}`;
    }
}


/* =========================================================
   WISHLIST
   ========================================================= */

function toggleWishlist(productId, button = null) {

    const id = Number(productId);
    const wishlist = getWishlist();

    const index = wishlist.indexOf(id);

    if (index >= 0) {

        wishlist.splice(index, 1);

        if (button) {
            button.classList.remove("active");
            button.textContent = "♡";
        }

        showToast("Removed from wishlist.");

    } else {

        wishlist.push(id);

        if (button) {
            button.classList.add("active");
            button.textContent = "♥";
        }

        showToast("Added to wishlist.");
    }

    saveWishlist(wishlist);

    updateWishlistButtons();
}


function updateWishlistButtons() {

    const wishlist = getWishlist();

    document.querySelectorAll("[data-wishlist]").forEach(button => {

        const id = Number(button.dataset.wishlist);

        if (wishlist.includes(id)) {
            button.classList.add("active");
            button.textContent = "♥";
        } else {
            button.classList.remove("active");
            button.textContent = "♡";
        }
    });

    const detailButton =
        document.querySelector(".wishlist-detail");

    if (detailButton) {

        const id = getCurrentProductId();

        if (wishlist.includes(id)) {
            detailButton.classList.add("active");
            detailButton.textContent = "♥";
        } else {
            detailButton.classList.remove("active");
            detailButton.textContent = "♡";
        }
    }
}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function createProductCard(product) {

    const wishlist = getWishlist();
    const isWishlisted = wishlist.includes(product.id);

    return `
        <article class="product-card reveal">

            <div class="product-image">

                <a href="product.html?id=${product.id}">
                    <img
                        src="${product.images[0]}"
                        alt="${product.name}"
                        loading="lazy"
                    >
                </a>

                <span class="product-badge">
                    ${product.badge}
                </span>

                <button
                    type="button"
                    class="wishlist-btn ${isWishlisted ? "active" : ""}"
                    data-wishlist="${product.id}"
                    aria-label="Toggle wishlist"
                >
                    ${isWishlisted ? "♥" : "♡"}
                </button>

                <button
                    type="button"
                    class="product-quick-add"
                    data-add-cart="${product.id}"
                >
                    Add to cart
                </button>

            </div>

            <div class="product-info-card">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3 class="product-title">
                    <a href="product.html?id=${product.id}">
                        ${product.name}
                    </a>
                </h3>

                <div class="product-meta">

                    <strong class="product-price">
                        ${formatPrice(product.price)}
                    </strong>

                    <div class="product-rating">
                        <span>★★★★★</span>
                        <span>${product.rating}</span>
                    </div>

                </div>

            </div>

        </article>
    `;
}


function renderProductGrid(container, list) {

    if (!container) return;

    container.innerHTML = list
        .map(createProductCard)
        .join("");

    observeRevealElements();

    updateWishlistButtons();
}


/* =========================================================
   HOME
   ========================================================= */

function initHome() {

    const featuredContainer =
        document.querySelector(".home-products");

    const trendingContainer =
        document.querySelector(".home-trending");

    if (featuredContainer) {

        const featured = products.slice(0, 4);

        renderProductGrid(
            featuredContainer,
            featured
        );
    }

    if (trendingContainer) {

        const trending = [
            products[3],
            products[1],
            products[5],
            products[6]
        ];

        renderProductGrid(
            trendingContainer,
            trending
        );
    }
}


/* =========================================================
   SHOP
   ========================================================= */

function initShop() {

    const container =
        document.querySelector("#shopProducts");

    if (!container) return;

    const searchInput =
        document.querySelector("#productSearch");

    const sortSelect =
        document.querySelector("#sortProducts");

    const priceRange =
        document.querySelector("#priceRange");

    const priceValue =
        document.querySelector("#priceValue");

    const resultCount =
        document.querySelector("#resultCount");

    const emptyProducts =
        document.querySelector("#emptyProducts");

    const clearFilters =
        document.querySelector("#clearFilters");

    const filterToggle =
        document.querySelector(".filter-toggle");

    const filterPanel =
        document.querySelector(".filter-panel");


    const params =
        new URLSearchParams(window.location.search);

    const categoryFromUrl =
        params.get("category");


    if (categoryFromUrl) {

        const radio =
            document.querySelector(
                `input[name="category"][value="${categoryFromUrl}"]`
            );

        if (radio) {
            radio.checked = true;
        }
    }


    function applyFilters() {

        const query =
            searchInput.value.trim().toLowerCase();

        const selectedCategory =
            document.querySelector(
                'input[name="category"]:checked'
            )?.value || "All";

        const maxPrice =
            Number(priceRange.value);


        let filtered = products.filter(product => {

            const matchesSearch =
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query);

            const matchesCategory =
                selectedCategory === "All" ||
                product.category === selectedCategory;

            const matchesPrice =
                product.price <= maxPrice;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesPrice
            );
        });


        switch (sortSelect.value) {

            case "price-low":
                filtered.sort(
                    (a, b) => a.price - b.price
                );
                break;

            case "price-high":
                filtered.sort(
                    (a, b) => b.price - a.price
                );
                break;

            case "rating":
                filtered.sort(
                    (a, b) => b.rating - a.rating
                );
                break;

            case "name":
                filtered.sort(
                    (a, b) => a.name.localeCompare(b.name)
                );
                break;

            default:
                break;
        }


        if (priceValue) {
            priceValue.textContent =
                Number(maxPrice).toLocaleString("en-IN");
        }


        if (resultCount) {
            resultCount.textContent =
                `${filtered.length} ${
                    filtered.length === 1 ? "product" : "products"
                }`;
        }


        if (filtered.length === 0) {

            container.innerHTML = "";

            if (emptyProducts) {
                emptyProducts.hidden = false;
            }

        } else {

            if (emptyProducts) {
                emptyProducts.hidden = true;
            }

            renderProductGrid(
                container,
                filtered
            );
        }
    }


    searchInput.addEventListener(
        "input",
        applyFilters
    );

    sortSelect.addEventListener(
        "change",
        applyFilters
    );

    priceRange.addEventListener(
        "input",
        applyFilters
    );


    document
        .querySelectorAll('input[name="category"]')
        .forEach(radio => {

            radio.addEventListener(
                "change",
                applyFilters
            );

        });


    clearFilters?.addEventListener(
        "click",
        () => {

            searchInput.value = "";

            priceRange.value = 50000;

            const allRadio =
                document.querySelector(
                    'input[name="category"][value="All"]'
                );

            if (allRadio) {
                allRadio.checked = true;
            }

            sortSelect.value = "featured";

            applyFilters();
        }
    );


    filterToggle?.addEventListener(
        "click",
        () => {
            filterPanel.classList.toggle("open");
        }
    );


    applyFilters();
}


/* =========================================================
   PRODUCT DETAILS
   ========================================================= */

function getCurrentProductId() {

    const params =
        new URLSearchParams(window.location.search);

    return Number(params.get("id")) || 1;
}


function initProductDetails() {

    const mainImage =
        document.querySelector("#productMainImage");

    if (!mainImage) return;

    const product =
        getProduct(getCurrentProductId());

    if (!product) {

        window.location.href = "shop.html";
        return;
    }


    document.title =
        `${product.name} — AUREL`;


    const name =
        document.querySelector("#productName");

    const category =
        document.querySelector("#detailCategory");

    const breadcrumbCategory =
        document.querySelector("#productCategory");

    const price =
        document.querySelector("#productPrice");

    const oldPrice =
        document.querySelector("#productOldPrice");

    const discount =
        document.querySelector("#productDiscount");

    const description =
        document.querySelector("#productDescription");

    const material =
        document.querySelector("#specMaterial");

    const finish =
        document.querySelector("#specFinish");


    name.textContent = product.name;

    category.textContent =
        `${product.category} / AUREL`;

    breadcrumbCategory.textContent =
        product.category;

    price.textContent =
        formatPrice(product.price);

    oldPrice.textContent =
        formatPrice(product.oldPrice);

    description.textContent =
        product.description;

    material.textContent =
        product.material;

    finish.textContent =
        product.finish;


    const discountPercent =
        Math.round(
            ((product.oldPrice - product.price) /
                product.oldPrice) * 100
        );

    discount.textContent =
        `-${discountPercent}%`;


    mainImage.src =
        product.images[0];

    mainImage.alt =
        product.name;


    const thumbs =
        document.querySelector("#galleryThumbs");

    thumbs.innerHTML =
        product.images.map((image, index) => `
            <button
                type="button"
                class="gallery-thumb ${index === 0 ? "active" : ""}"
                data-image="${image}"
            >
                <img
                    src="${image}"
                    alt="${product.name} view ${index + 1}"
                >
            </button>
        `).join("");


    thumbs
        .querySelectorAll(".gallery-thumb")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    mainImage.src =
                        button.dataset.image;

                    thumbs
                        .querySelectorAll(".gallery-thumb")
                        .forEach(item =>
                            item.classList.remove("active")
                        );

                    button.classList.add("active");
                }
            );

        });


    let quantity = 1;

    const quantityDisplay =
        document.querySelector("#productQuantity");

    document
        .querySelector(".quantity-minus")
        ?.addEventListener(
            "click",
            () => {

                quantity =
                    Math.max(1, quantity - 1);

                quantityDisplay.textContent =
                    quantity;
            }
        );


    document
        .querySelector(".quantity-plus")
        ?.addEventListener(
            "click",
            () => {

                quantity =
                    Math.min(10, quantity + 1);

                quantityDisplay.textContent =
                    quantity;
            }
        );


    document
        .querySelector(".add-detail-cart")
        ?.addEventListener(
            "click",
            () => {

                addToCart(
                    product.id,
                    quantity
                );
            }
        );


    document
        .querySelector(".buy-now")
        ?.addEventListener(
            "click",
            () => {

                addToCart(
                    product.id,
                    quantity
                );

                window.location.href =
                    "cart.html";
            }
        );


    document
        .querySelector(".wishlist-detail")
        ?.addEventListener(
            "click",
            event => {

                toggleWishlist(
                    product.id,
                    event.currentTarget
                );
            }
        );


    const relatedContainer =
        document.querySelector("#relatedProducts");


    if (relatedContainer) {

        const related =
            products
                .filter(item =>
                    item.category === product.category &&
                    item.id !== product.id
                )
                .slice(0, 4);

        if (related.length < 4) {

            const additional =
                products
                    .filter(item =>
                        item.id !== product.id &&
                        !related.some(
                            existing =>
                                existing.id === item.id
                        )
                    )
                    .slice(
                        0,
                        4 - related.length
                    );

            related.push(...additional);
        }

        renderProductGrid(
            relatedContainer,
            related
        );
    }


    updateWishlistButtons();
}


/* =========================================================
   CONTACT FORM
   ========================================================= */

function initContactForm() {

    const form =
        document.querySelector("#contactForm");

    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const fields = [
                {
                    id: "name",
                    message: "Please enter your name."
                },
                {
                    id: "email",
                    message: "Please enter a valid email."
                },
                {
                    id: "subject",
                    message: "Please enter a subject."
                },
                {
                    id: "message",
                    message: "Please enter your message."
                }
            ];


            let valid = true;


            fields.forEach(field => {

                const input =
                    document.querySelector(`#${field.id}`);

                const wrapper =
                    input.closest(".form-field");

                const error =
                    wrapper.querySelector(".error-message");


                wrapper.classList.remove("invalid");

                error.textContent = "";


                let isValid =
                    input.value.trim().length > 0;


                if (
                    field.id === "email" &&
                    input.value.trim()
                ) {

                    isValid =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                            .test(input.value.trim());
                }


                if (!isValid) {

                    valid = false;

                    wrapper.classList.add("invalid");

                    error.textContent =
                        field.message;
                }

            });


            if (!valid) {
                return;
            }


            showToast(
                "Message sent successfully. Thank you!"
            );

            form.reset();
        }
    );
}


/* =========================================================
   NEWSLETTER
   ========================================================= */

function initNewsletter() {

    document
        .querySelectorAll(".newsletter-form")
        .forEach(form => {

            form.addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                    const input =
                        form.querySelector("input");

                    if (
                        !input.value ||
                        !input.checkValidity()
                    ) {

                        input.reportValidity();
                        return;
                    }

                    showToast(
                        "You're on the AUREL list."
                    );

                    form.reset();
                }
            );

        });
}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function initMobileMenu() {

    const menu =
        document.querySelector(".mobile-menu");

    const openButton =
        document.querySelector(".menu-toggle");

    const closeButton =
        document.querySelector(".mobile-close");

    if (!menu || !openButton) return;


    function openMenu() {

        menu.classList.add("open");
        document.body.classList.add("menu-open");
    }


    function closeMenu() {

        menu.classList.remove("open");
        document.body.classList.remove("menu-open");
    }


    openButton.addEventListener(
        "click",
        openMenu
    );


    closeButton?.addEventListener(
        "click",
        closeMenu
    );


    menu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });
}


/* =========================================================
   GLOBAL CLICK HANDLERS
   ========================================================= */

function initGlobalClicks() {

    document.addEventListener(
        "click",
        event => {

            const addButton =
                event.target.closest("[data-add-cart]");

            if (addButton) {

                addToCart(
                    Number(addButton.dataset.addCart)
                );

                return;
            }


            const wishlistButton =
                event.target.closest("[data-wishlist]");

            if (wishlistButton) {

                toggleWishlist(
                    Number(wishlistButton.dataset.wishlist),
                    wishlistButton
                );

                return;
            }


            const plusButton =
                event.target.closest("[data-cart-plus]");

            if (plusButton) {

                changeCartQuantity(
                    Number(plusButton.dataset.cartPlus),
                    1
                );

                return;
            }


            const minusButton =
                event.target.closest("[data-cart-minus]");

            if (minusButton) {

                changeCartQuantity(
                    Number(minusButton.dataset.cartMinus),
                    -1
                );

                return;
            }


            const removeButton =
                event.target.closest("[data-cart-remove]");

            if (removeButton) {

                removeFromCart(
                    Number(removeButton.dataset.cartRemove)
                );

            }

        }
    );
}


/* =========================================================
   CART BUTTONS
   ========================================================= */

function initCartActions() {

    document
        .querySelector("#clearCart")
        ?.addEventListener(
            "click",
            clearCart
        );


    document
        .querySelector(".checkout-btn")
        ?.addEventListener(
            "click",
            () => {

                const cart = getCart();

                if (cart.length === 0) {

                    showToast("Your cart is empty.");
                    return;
                }

                showToast(
                    "Checkout demo — no real payment is processed."
                );
            }
        );
}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

let revealObserver;


function observeRevealElements() {

    const elements =
        document.querySelectorAll(
            ".reveal:not(.observed)"
        );


    if (!revealObserver) {

        revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: .12
                }
            );
    }


    elements.forEach(element => {

        element.classList.add("observed");

        revealObserver.observe(element);

    });
}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartCount();

        initMobileMenu();

        initGlobalClicks();

        initHome();

        initShop();

        initProductDetails();

        initContactForm();

        initNewsletter();

        initCartActions();

        renderCart();

        observeRevealElements();

        updateWishlistButtons();

    }
);
