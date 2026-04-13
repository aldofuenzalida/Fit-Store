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
