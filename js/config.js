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
    // Formulario público de TASS: destino de todos los botones de contacto
    formUrl: "http://tass.itintegraltech.com/public/mfs-travel-design/datos",
    // WhatsApp (solo botón flotante). Formato internacional sin "+", espacios ni guiones
    whatsapp: "549116953819",
    instagram: "de.usa.a.vos"
  },

  // Mensaje precargado del botón flotante de WhatsApp
  messages: {
    default: "¡Hola! Vi la web de MFS Travel Design y quiero hacer una consulta."
  },

  credits: {
    name: "IT Integral Solutions",
    url: "https://itintegraltech.com"
  }
});
