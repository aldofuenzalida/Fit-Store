const WHATSAPP_NUMBER = "56971295966";

const MSG_ROPA = "Hola Aldo, estoy interesado en el catálogo de ropa deportiva. ¿Me puedes dar más información?";
const MSG_MAYOR = "Hola Aldo, estoy interesado en productos al por mayor (suplementos). ¿Me puedes enviar lista y precios?";
const MSG_GENERAL = "Hola Aldo, estoy interesado en tus productos, ¿Puedes darme mas informacion?.";

document.getElementById("year").textContent = new Date().getFullYear();

function waLink(message){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const waRopaBtn = document.getElementById("waRopaBtn");
const waMayorBtn = document.getElementById("waMayorBtn");
const waMainBtn = document.getElementById("waMainBtn");
const waFloat = document.getElementById("whatsappFloat");

if (waRopaBtn) waRopaBtn.href = waLink(MSG_ROPA);
if (waMayorBtn) waMayorBtn.href = waLink(MSG_MAYOR);
if (waMainBtn) waMainBtn.href = waLink(MSG_GENERAL);
if (waFloat) waFloat.href = waLink(MSG_GENERAL);

// fallback: si el video falla, se oculta y queda fondo oscuro elegante
const heroVideo = document.getElementById("heroVideo");
if (heroVideo) {
  heroVideo.addEventListener("error", () => {
    heroVideo.style.display = "none";
  });
}
