/**
 * MFS Travel Design — comportamiento del sitio.
 * Lee todos los datos desde window.MFS_CONFIG (js/config.js).
 */
(function () {
  "use strict";

  const config = window.MFS_CONFIG;
  const root = document.documentElement;
  root.classList.add("js");

  if (!config) {
    console.warn("[MFS] Falta js/config.js");
    return;
  }

  const { contact, messages, credits, brand } = config;

  /* ---------- Enlaces de contacto ---------- */
  const buildWhatsappUrl = (text) =>
    `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;

  const buildInstagramUrl = () => `https://www.instagram.com/${contact.instagram}/`;

  function hydrateContactLinks() {
    document.querySelectorAll('[data-contact="whatsapp"]').forEach((el) => {
      const key = el.dataset.message || "default";
      el.href = buildWhatsappUrl(messages[key] || messages.default);
    });

    document.querySelectorAll('[data-contact="instagram"]').forEach((el) => {
      el.href = buildInstagramUrl();
    });

    const texts = {
      phone: contact.phoneDisplay,
      instagram: `@${contact.instagram}`
    };
    document.querySelectorAll("[data-contact-text]").forEach((el) => {
      const value = texts[el.dataset.contactText];
      if (value) el.textContent = value;
    });

    document.querySelectorAll("[data-credits]").forEach((el) => {
      el.href = credits.url;
      el.setAttribute("aria-label", `Diseño y desarrollo: ${credits.name}`);
    });

    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ---------- Datos estructurados (SEO) ---------- */
  function injectStructuredData() {
    const data = {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: brand.name,
      slogan: brand.slogan,
      telephone: `+${contact.whatsapp}`,
      sameAs: [buildInstagramUrl()],
      areaServed: ["Miami", "Orlando", "Nueva York"]
    };
    if (brand.siteUrl) data.url = brand.siteUrl;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /* ---------- Header ---------- */
  function initHeader() {
    const header = document.querySelector("[data-header]");
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Menú móvil ---------- */
  function initMobileMenu() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-mobile-menu]");
    const header = document.querySelector("[data-header]");
    if (!toggle || !menu) return;

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      menu.hidden = !open;
      header.classList.toggle("is-scrolled", open || window.scrollY > 12);
    };

    toggle.addEventListener("click", () => setOpen(menu.hidden));
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.hidden) {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 1000px)").addEventListener("change", (e) => {
      if (e.matches) setOpen(false);
    });
  }

  /* ---------- Animaciones al hacer scroll ---------- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min((i % 4) * 70, 210)}ms`;
      observer.observe(el);
    });
  }

  /* ---------- Formulario → WhatsApp ---------- */
  function initTripForm() {
    const form = document.querySelector("[data-trip-form]");
    if (!form) return;
    const error = form.querySelector("[data-form-error]");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = form.elements;
      const required = [f.nombre, f.destino];
      let valid = true;
      required.forEach((field) => {
        const ok = field.value.trim() !== "";
        field.classList.toggle("is-invalid", !ok);
        if (!ok) valid = false;
      });
      error.hidden = valid;
      if (!valid) return;

      const lines = [
        `¡Hola! Soy ${f.nombre.value.trim()}.`,
        `Quiero diseñar un viaje a: ${f.destino.value}.`
      ];
      if (f.fecha.value.trim()) lines.push(`Fecha aproximada: ${f.fecha.value.trim()}.`);
      if (f.viajeros.value.trim()) lines.push(`Viajeros: ${f.viajeros.value.trim()}.`);
      if (f.mensaje.value.trim()) lines.push(f.mensaje.value.trim());

      window.open(buildWhatsappUrl(lines.join("\n")), "_blank", "noopener");
    });
  }

  /* ---------- Página actual en el menú ---------- */
  function markCurrentPage() {
    // Cloudflare Pages sirve URLs sin ".html", por eso se normaliza
    const clean = (path) => path.replace(/\.html$/, "").replace(/^index$/, "");
    const page = clean(location.pathname.split("/").pop());
    document.querySelectorAll(".nav__list a").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href.includes("#") && clean(href) === page) a.setAttribute("aria-current", "page");
    });
  }

  hydrateContactLinks();
  injectStructuredData();
  initHeader();
  initMobileMenu();
  initReveal();
  initTripForm();
  markCurrentPage();
})();
