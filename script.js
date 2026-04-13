// ===== Product Data =====
const products = [
  {
    id: 1,
    name: "Whey Protein Gold",
    category: "protein",
    price: 49.99,
    oldPrice: 64.99,
    emoji: "💪",
    description: "25g of protein per serving. Chocolate, Vanilla & Strawberry flavors.",
    badge: "sale",
    badgeText: "Sale",
  },
  {
    id: 2,
    name: "Pre-Workout Extreme",
    category: "pre-workout",
    price: 34.99,
    oldPrice: null,
    emoji: "⚡",
    description: "Explosive energy, focus and endurance for your hardest workouts.",
    badge: "new",
    badgeText: "New",
  },
  {
    id: 3,
    name: "Creatine Monohydrate",
    category: "creatine",
    price: 24.99,
    oldPrice: null,
    emoji: "🏋️",
    description: "Pure micronized creatine for strength and muscle gains. 300g.",
    badge: null,
    badgeText: null,
  },
  {
    id: 4,
    name: "BCAA 2:1:1 Recovery",
    category: "amino",
    price: 29.99,
    oldPrice: 37.99,
    emoji: "🔬",
    description: "Essential branched-chain amino acids to reduce muscle soreness.",
    badge: "sale",
    badgeText: "Sale",
  },
  {
    id: 5,
    name: "Multivitamin Pack",
    category: "vitamins",
    price: 19.99,
    oldPrice: null,
    emoji: "💊",
    description: "Complete daily vitamin & mineral complex for active athletes.",
    badge: null,
    badgeText: null,
  },
  {
    id: 6,
    name: "Mass Gainer Pro",
    category: "protein",
    price: 59.99,
    oldPrice: 74.99,
    emoji: "🥤",
    description: "1000+ calories per serving with quality carbs and proteins. 5 lbs.",
    badge: "sale",
    badgeText: "Sale",
  },
  {
    id: 7,
    name: "Omega-3 Fish Oil",
    category: "vitamins",
    price: 14.99,
    oldPrice: null,
    emoji: "🐟",
    description: "High-potency EPA & DHA for heart health and joint support.",
    badge: "new",
    badgeText: "New",
  },
  {
    id: 8,
    name: "L-Glutamine Recovery",
    category: "amino",
    price: 22.99,
    oldPrice: null,
    emoji: "🧬",
    description: "Supports muscle recovery and immune system health. Unflavored.",
    badge: null,
    badgeText: null,
  },
  {
    id: 9,
    name: "Casein Protein Night",
    category: "protein",
    price: 44.99,
    oldPrice: 54.99,
    emoji: "🌙",
    description: "Slow-release protein to fuel muscle recovery while you sleep.",
    badge: "sale",
    badgeText: "Sale",
  },
  {
    id: 10,
    name: "Fat Burner Thermo",
    category: "fat-burner",
    price: 39.99,
    oldPrice: null,
    emoji: "🔥",
    description: "Thermogenic formula to accelerate metabolism and promote fat loss.",
    badge: "new",
    badgeText: "New",
  },
  {
    id: 11,
    name: "Shaker Pro 700ml",
    category: "accessories",
    price: 12.99,
    oldPrice: null,
    emoji: "🧴",
    description: "Leak-proof BPA-free shaker with mixing ball. Multiple colors.",
    badge: null,
    badgeText: null,
  },
  {
    id: 12,
    name: "Resistance Bands Set",
    category: "accessories",
    price: 18.99,
    oldPrice: 24.99,
    emoji: "🤸",
    description: "Set of 5 resistance bands with different tension levels.",
    badge: "sale",
    badgeText: "Sale",
  },
];

// ===== State =====
let cart = [];
let activeFilter = "all";

// ===== DOM Elements =====
const productsGrid = document.getElementById("productsGrid");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsContainer = document.getElementById("cartItems");
const cartCountEl = document.getElementById("cartCount");
const cartSubtotalEl = document.getElementById("cartSubtotal");
const cartShippingEl = document.getElementById("cartShipping");
const cartTotalEl = document.getElementById("cartTotal");
const toastContainer = document.getElementById("toastContainer");
const filterBtns = document.querySelectorAll(".filter-btn");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

// ===== Render Products =====
function renderProducts(filter = "all") {
  const filtered =
    filter === "all"
      ? products
      : products.filter((p) => p.category === filter);

  productsGrid.innerHTML = "";

  if (filtered.length === 0) {
    productsGrid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--text-light);padding:2rem;">No products found in this category.</p>`;
    return;
  }

  filtered.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img-wrap">
        <span class="product-emoji" aria-hidden="true">${product.emoji}</span>
        ${product.badge ? `<span class="product-badge ${product.badge}">${product.badgeText}</span>` : ""}
      </div>
      <div class="product-info">
        <span class="product-category">${formatCategory(product.category)}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-current">$${product.price.toFixed(2)}</span>
            ${product.oldPrice ? `<span class="price-old">$${product.oldPrice.toFixed(2)}</span>` : ""}
          </div>
          <button class="add-to-cart" onclick="addToCart(${product.id})" aria-label="Add ${product.name} to cart">
            Add to Cart
          </button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

function formatCategory(cat) {
  const map = {
    protein: "Protein",
    "pre-workout": "Pre-Workout",
    creatine: "Creatine",
    amino: "Amino Acids",
    vitamins: "Vitamins",
    "fat-burner": "Fat Burner",
    accessories: "Accessories",
  };
  return map[cat] || cat;
}

// ===== Cart Logic =====
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(`${product.emoji} <strong>${product.name}</strong> added to cart!`);
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
}

function changeQty(productId, delta) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    updateCartUI();
  }
}

function updateCartUI() {
  // Update count badge
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCountEl.textContent = totalItems;
  cartCountEl.style.display = totalItems === 0 ? "none" : "inline-flex";

  // Render cart items
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <p>Your cart is empty.</p>
        <p style="font-size:0.85rem;margin-top:0.4rem;">Add some products to get started!</p>
      </div>`;
  } else {
    cartItemsContainer.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <div class="cart-item-emoji" aria-hidden="true">${item.emoji}</div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)" aria-label="Decrease quantity">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="remove-item" onclick="removeFromCart(${item.id})" aria-label="Remove ${item.name} from cart">✕</button>
      </div>`
      )
      .join("");
  }

  // Update totals
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 75 ? 0 : 5.99;
  const total = subtotal + shipping;

  cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  cartShippingEl.textContent = shipping === 0 && subtotal > 0 ? "FREE" : `$${shipping.toFixed(2)}`;
  cartTotalEl.textContent = `$${total.toFixed(2)}`;
}

// ===== Cart Sidebar Toggle =====
function openCart() {
  cartSidebar.classList.add("open");
  cartOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartSidebar.classList.remove("open");
  cartOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("cartToggle").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("🛒 Your cart is empty!");
    return;
  }
  showToast("✅ Thank you for your order! We'll be in touch soon.");
  cart = [];
  updateCartUI();
  closeCart();
});

// ===== Filter Buttons =====
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderProducts(activeFilter);
  });
});

// ===== Hamburger Menu =====
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// ===== Toast Notification =====
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 2700);
}

// ===== Hero Scroll CTA =====
document.getElementById("shopNowBtn").addEventListener("click", () => {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});

// ===== Init =====
renderProducts();
updateCartUI();
