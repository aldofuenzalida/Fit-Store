// ====== CONFIG ======
const WHATSAPP_NUMBER = "56971295966"; // sin +
const WHATSAPP_MESSAGE = "Hola Aldo, estoy interesado en tus productos, ¿Puedes darme mas informacion?.";
const CANVA_PUBLIC_URL = "https://www.canva.com/design/DAGl75d6Rtg/kbLIZOwqqt1tLK_cAWYfQA/view";
const CANVA_EMBED_URL = "https://www.canva.com/design/DAGl75d6Rtg/kbLIZOwqqt1tLK_cAWYfQA/view?embed";
// ====================

document.getElementById("year").textContent = new Date().getFullYear();

const encodedMsg = encodeURIComponent(WHATSAPP_MESSAGE);
const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

// Botones/links WhatsApp
const waIds = ["heroWhatsappBtn", "waTextLink", "mayoristaBtn", "whatsappFloat"];
waIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.href = whatsappURL;
    el.target = "_blank";
    el.rel = "noopener";
  }
});

// Links Canva
const canvaLink = document.getElementById("canvaLink");
const canvaTextLink = document.getElementById("canvaTextLink");
const canvaEmbed = document.getElementById("canvaEmbed");

if (canvaLink) canvaLink.href = CANVA_PUBLIC_URL;
if (canvaTextLink) canvaTextLink.href = CANVA_PUBLIC_URL;

// Embed: si no carga por restricciones, igual quedará el botón de abrir catálogo
if (CANVA_EMBED_URL) {
  canvaEmbed.src = CANVA_EMBED_URL;
} else {
  canvaEmbed.parentElement.style.display = "none";
}

// Formulario demo (sin backend)
const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  msg.textContent = "Gracias. Te responderemos pronto. También puedes escribir por WhatsApp.";
  form.reset();
});
// ===== CONFIG =====
const WHATSAPP_NUMBER = "56971295966";

// Mensajes por sección
const MSG_ROPA = "Hola Aldo, estoy interesado en el catálogo de ropa deportiva. ¿Me puedes dar más información?";
const MSG_MAYOR = "Hola Aldo, estoy interesado en productos al por mayor (suplementos). ¿Me puedes enviar lista y precios?";
const MSG_GENERAL = "Hola Aldo, estoy interesado en tus productos, ¿Puedes darme mas informacion?.";

// Catálogos Canva (separados)
const LINK_CATALOGO_ROPA = "https://www.canva.com/design/DAHGvseG0iY/IO6EJQKciq2XtHkYsSUHlg/view";
const LINK_CATALOGO_MAYOR = "https://www.canva.com/design/DAHGvn9iCrY/TeqpoWdJGAx3euB3KqkXjQ/view";
// ====================

document.getElementById("year").textContent = new Date().getFullYear();

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Botones de catálogo
const ropaBtn = document.getElementById("catalogoRopaBtn");
const mayorBtn = document.getElementById("catalogoMayorBtn");

if (ropaBtn) ropaBtn.href = LINK_CATALOGO_ROPA;
if (mayorBtn) mayorBtn.href = LINK_CATALOGO_MAYOR;

// Botones de WhatsApp por sección
const waRopaBtn = document.getElementById("waRopaBtn");
const waMayorBtn = document.getElementById("waMayorBtn");
const waMainBtn = document.getElementById("waMainBtn");
const waFloat = document.getElementById("whatsappFloat");

if (waRopaBtn) waRopaBtn.href = waLink(MSG_ROPA);
if (waMayorBtn) waMayorBtn.href = waLink(MSG_MAYOR);
if (waMainBtn) waMainBtn.href = waLink(MSG_GENERAL);
if (waFloat) waFloat.href = waLink(MSG_GENERAL);

// Asegurar target blank en todos los links externos importantes
["catalogoRopaBtn", "catalogoMayorBtn", "waRopaBtn", "waMayorBtn", "waMainBtn", "whatsappFloat"].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.target = "_blank";
    el.rel = "noopener";
  }
});
