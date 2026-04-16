/* =========================
   AF LABS - SCRIPT FINAL
   ========================= */

const WHATSAPP_NUMBER = "56971295966";

// Supabase (frontend: SOLO publishable key)
const SUPABASE_URL = "https://mrwrotpewtpcuqxvzgoo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ZeuaFzTNkdvCofSvr7vAWg_jlcBd4DL";

const MSG_GENERAL = "Hola AF Labs, estoy interesado en sus productos. ¿Me pueden dar más información?";

let allProducts = [];
let currentCategory = "todos";
const cart = JSON.parse(localStorage.getItem("cart_aflabs") || "[]");

/* helpers */
function clp(n) {
  return new Intl.NumberFormat("es-CL").format(Number(n || 0));
}
function waLink(message){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
function saveCart(){
  localStorage.setItem("cart_aflabs", JSON.stringify(cart));
}

/* init UI */
(function initBaseUI(){
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const waMainBtn = document.getElementById("waMainBtn");
  const waFloat = document.getElementById("whatsappFloat");
  if (waMainBtn) waMainBtn.href = waLink(MSG_GENERAL);
  if (waFloat) waFloat.href = waLink(MSG_GENERAL);

  ["heroMainVideo","mayorVideo"].forEach(id => {
    const v = document.getElementById(id);
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.volume = 0;
    v.removeAttribute("controls");
    const p = v.play();
    if (p && typeof p.then === "function") p.catch(() => {});
  });
})();

/* carrito */
function addToCart(product){
  const found = cart.find(i => i.id === product.id);
  if (found) found.qty += 1;
  else cart.push({
    id: product.id,
    name: product.name,
    price_clp: Number(product.price_clp),
    qty: 1
  });
  saveCart();
  renderCart();
}

function removeFromCart(id){
  const idx = cart.findIndex(i => i.id === id);
  if (idx >= 0){
    cart.splice(idx, 1);
    saveCart();
    renderCart();
  }
}

function changeQty(id, delta){
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  saveCart();
  renderCart();
}

function renderCart(){
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");
  if (!cartItems || !cartTotal || !cartCount) return;

  if (cart.length === 0){
    cartItems.innerHTML = `<p style="color:#666;">Tu carrito está vacío.</p>`;
    cartTotal.textContent = "$0";
    cartCount.textContent = "0";
    return;
  }

  let total = 0;
  cartItems.innerHTML = cart.map(i => {
    const sub = i.price_clp * i.qty;
    total += sub;
    return `
      <div class="cart-item">
        <div>
          <strong>${i.name}</strong>
          <p>$${clp(i.price_clp)} x ${i.qty}</p>
        </div>
        <div class="cart-actions">
          <button onclick="changeQty(${i.id}, -1)">-</button>
          <button onclick="changeQty(${i.id}, 1)">+</button>
          <button onclick="removeFromCart(${i.id})">x</button>
        </div>
      </div>
    `;
  }).join("");

  cartTotal.textContent = `$${clp(total)}`;
  cartCount.textContent = String(cart.reduce((a, i) => a + i.qty, 0));
}

function checkoutWhatsApp(){
  if (cart.length === 0){
    alert("Tu carrito está vacío.");
    return;
  }

  const lines = cart.map(i => `- ${i.name} x${i.qty} = $${clp(i.price_clp * i.qty)} CLP`);
  const total = cart.reduce((a, i) => a + i.price_clp * i.qty, 0);

  const msg = [
    "Hola AF Labs, quiero hacer este pedido:",
    "",
    ...lines,
    "",
    `Total: $${clp(total)} CLP`,
    "",
    "¿Me confirman stock y datos de pago?"
  ].join("\n");

  window.open(waLink(msg), "_blank");
}

/* productos */
function renderProducts(products){
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  if (!products.length){
    grid.innerHTML = "<p>No hay productos en esta categoría.</p>";
    return;
  }

  grid.innerHTML = products.map(p => `
    <article class="product-card">
      <img src="${p.image_url || ''}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/600x600?text=AF+Labs';" />
      <h4>${p.name}</h4>
      <p>${p.description || ""}</p>
      <div class="product-meta">
        <strong>$${clp(p.price_clp)} CLP</strong>
      </div>
      <button class="btn" onclick='addToCart(${JSON.stringify(p)})'>Agregar al carrito</button>
    </article>
  `).join("");
}

function applyFilter(category){
  currentCategory = category;
  const filtered = category === "todos"
    ? allProducts
    : allProducts.filter(p => p.category === category);

  renderProducts(filtered);

  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  const btn = document.querySelector(`[data-cat="${category}"]`);
  if (btn) btn.classList.add("active");
}

async function loadProducts(){
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  try {
    const endpoint = `${SUPABASE_URL}/rest/v1/products?select=id,name,description,price_clp,image_url,category,active&active=eq.true&order=id.asc`;

    const res = await fetch(endpoint, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const products = await res.json();
    allProducts = Array.isArray(products) ? products : [];
    applyFilter(currentCategory);
  } catch (error){
    console.error("Error cargando productos:", error);
    grid.innerHTML = `<p>Error cargando productos. Revisa keys/policies en Supabase.</p>`;
  }
}

/* global para botones HTML */
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeQty = changeQty;
window.checkoutWhatsApp = checkoutWhatsApp;
window.applyFilter = applyFilter;

/* start */
loadProducts();
renderCart();
