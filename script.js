// Product data for the Inspire Art Store
const products = [
    {
        id: 1,
        name: 'Leafy Serenity',
        price: 29.99,
        image: 'assets/leafy-serenity.png',
        description: 'This biophilic‑inspired art print features lush greenery and organic textures, bringing nature’s calm into your home.'
    },
    {
        id: 2,
        name: 'Dreamscape Haven',
        price: 34.99,
        image: 'assets/dreamscape-haven.png',
        description: 'A soft surreal landscape of floating islands and gentle pastel colours invites you into a dreamlike world.'
    },
    {
        id: 3,
        name: 'Futuristic Flux',
        price: 32.99,
        image: 'assets/futuristic-flux.png',
        description: 'AI‑inspired abstract art with fluid geometry and vibrant hues, perfect for modern spaces.'
    },
    {
        id: 4,
        name: 'Retro Good Vibes',
        price: 24.99,
        image: 'assets/retro-good-vibes.png',
        description: 'A warm 70s‑inspired print with earthy tones and simple shapes that evoke nostalgic “good vibes.”'
    },
    {
        id: 5,
        name: 'Continuous Line Beauty',
        price: 27.99,
        image: 'assets/continuous-line-beauty.png',
        description: 'Minimalist line art portrait drawn with a single continuous line, bringing elegance to any room.'
    },
    {
        id: 6,
        name: 'Pop Culture Fun',
        price: 29.99,
        image: 'assets/pop-culture-fun.png',
        description: 'Pop art–inspired print featuring bold colours and playful characters, perfect for casual spaces.'
    }
];

// Retrieve cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || {};
}

// Save cart back to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count in navigation
function updateCartCount() {
    const cart = getCart();
    const count = Object.values(cart).reduce((a, b) => a + b, 0);
    // update all cart count spans (there may be multiple in different nav bars)
    document.querySelectorAll('#cart-count').forEach(span => {
        span.textContent = count;
    });
}

// Add a product to the cart by id
function addToCart(id) {
    const cart = getCart();
    cart[id] = (cart[id] || 0) + 1;
    saveCart(cart);
    updateCartCount();
    alert('Added to cart!');
}

// Remove a product from the cart
function removeFromCart(id) {
    const cart = getCart();
    delete cart[id];
    saveCart(cart);
    renderCart();
    updateCartCount();
}

// Render products on the products page
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    // Clear existing content
    grid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="card-body">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">$${product.price.toFixed(2)}</div>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Render cart items on the cart page
function renderCart() {
    const container = document.getElementById('cart-container');
    if (!container) return;
    const cart = getCart();
    const ids = Object.keys(cart);
    if (ids.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    let total = 0;
    let html = '';
    ids.forEach(id => {
        const qty = cart[id];
        const product = products.find(p => p.id === parseInt(id));
        if (!product) return;
        const itemTotal = product.price * qty;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <span class="quantity">Qty: ${qty}</span>
                <span class="price">$${itemTotal.toFixed(2)}</span>
                <button onclick="removeFromCart(${product.id})">Remove</button>
            </div>
        `;
    });
    html += `<div class="cart-total">Total: $${total.toFixed(2)}</div>`;
    html += `<a href="#" class="checkout-button" onclick="checkout(event)">Checkout</a>`;
    container.innerHTML = html;
}

// Checkout placeholder
function checkout(event) {
    event.preventDefault();
    alert('Thank you for your purchase! A download link for your digital prints will be sent to your email.');
    localStorage.removeItem('cart');
    renderCart();
    updateCartCount();
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderProducts();
    renderCart();
});