# MFS Travel Design — Landing

Sitio estático (HTML + CSS + JS, sin dependencias ni build) listo para Cloudflare Pages.

## Estructura

```
index.html               Landing principal
miami-experience.html    Página del producto principal
404.html                 Página de error (Cloudflare la usa automáticamente)
_headers                 Cabeceras de seguridad y caché para Cloudflare
robots.txt · site.webmanifest · favicon.ico
css/
  fonts.css              @font-face de las tipografías locales
  variables.css          Colores, tipografías y medidas de la marca
  styles.css             Estilos del sitio
js/
  config.js              DATOS EDITABLES: WhatsApp, Instagram, mensajes, créditos, dominio
  main.js                Comportamiento (menú, animaciones, formulario → WhatsApp)
assets/
  fonts/                 Playfair Display + Montserrat (woff2)
  icons/sprite.svg       Íconos
  img/logos/             Logos MFS e IT Integral Solutions (webp + png)
  img/destinos/          Ilustraciones de destinos (reemplazables por fotos)
  img/equipo/            Fotos de Fer y Eve (hoy: placeholders)
  img/favicon/ · img/og/ Íconos de la app e imagen para compartir en redes
```

## Cambiar datos de contacto

Todo se edita en `js/config.js`: número de WhatsApp, cómo se muestra el teléfono, usuario de Instagram, mensajes precargados y el link de créditos.

## Reemplazar imágenes por fotos reales

Guardar la foto en la carpeta correspondiente de `assets/img/` y actualizar la ruta `src` en el HTML (por ejemplo `assets/img/destinos/miami.svg` → `assets/img/destinos/miami.webp`). Recomendado: WebP, 1200 px de ancho, menos de 250 KB.

## Publicar en Cloudflare Pages

1. Cloudflare → Workers & Pages → Create → Pages → subir esta carpeta (o conectar el repositorio).
2. Build command: *(vacío)* · Output directory: `/`
3. Conectar el dominio y completar `brand.siteUrl` en `js/config.js`.
# MFS
