/**
 * MFS Travel Design — configuración central del sitio.
 * Todos los datos de contacto, mensajes y créditos se editan SOLO acá.
 */
window.MFS_CONFIG = Object.freeze({
  brand: {
    name: "MFS Travel Design",
    slogan: "El mundo a tu alcance",
    siteUrl: "" // Completar con el dominio final, ej.: "https://mfstraveldesign.com"
  },

  contact: {
    // Número en formato internacional, sin "+", espacios ni guiones (formato wa.me)
    whatsapp: "549116953819",
    phoneDisplay: "+54 9 11 695-3819",
    instagram: "de.usa.a.vos"
  },

  // Mensajes precargados de WhatsApp (se eligen con data-message="clave")
  messages: {
    default: "¡Hola! Vi la web de MFS Travel Design y quiero empezar a diseñar mi viaje.",
    miami: "¡Hola! Quiero información para viajar a Miami.",
    orlando: "¡Hola! Quiero información para viajar a Orlando (Disney & Universal).",
    nuevaYork: "¡Hola! Quiero información para viajar a Nueva York.",
    otros: "¡Hola! Quiero consultar por un viaje a otro destino.",
    miamiExperience: "¡Hola! Quiero información sobre Miami Experience by Eve & Fer."
  },

  credits: {
    name: "IT Integral Solutions",
    url: "https://itintegraltech.com"
  }
});
