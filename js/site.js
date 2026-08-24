const dict = {
  ru: {
    brandSub: "Бишкек",
    nav: { home: "Главная", rooms: "Номера", spa: "SPA", events: "Залы", photos: "Фото", contacts: "Контакты" },
    book: "Забронировать",
    call: "Позвонить",
    folio: "Бронирование",
    arrive: "Заезд",
    depart: "Выезд",
    guests: "Гости",
    find: "Найти номер",
    guestOptions: ["1 гость", "2 гостя", "3 гостя", "4 гостя"],
    skip: "К содержанию",
    menu: "Меню",
    lang: "Язык",
    footer: {
      blurb: "ул. Эмилбека Айылчиева, 61, Бишкек. Отель с бассейном, спа, рестораном и конференц-залами.",
      stay: "Проживание",
      rooms: "Номера",
      booking: "Онлайн-бронирование",
      delivery: "Доставка из ресторана",
      offer: "Коммерческое предложение",
      house: "Отель",
      spa: "SPA и бассейн",
      halls: "Конференц-залы",
      photos: "Фото",
      amenities: "Услуги",
      desk: "Контакты",
      contacts: "Контакты",
      video: "Видеообзор",
      legal: "© 2026 Garden Hotel & SPA",
      legal2: "Ресепшн 24/7 · завтрак включён",
    },
  },
  en: {
    brandSub: "Bishkek",
    nav: { home: "Home", rooms: "Rooms", spa: "SPA", events: "Halls", photos: "Photos", contacts: "Contacts" },
    book: "Book",
    call: "Call",
    folio: "Booking",
    arrive: "Check-in",
    depart: "Check-out",
    guests: "Guests",
    find: "Find a room",
    guestOptions: ["1 guest", "2 guests", "3 guests", "4 guests"],
    skip: "Skip to content",
    menu: "Menu",
    lang: "Language",
    footer: {
      blurb: "Emilbek Ailchiev 61, Bishkek. Hotel with a pool, spa, restaurant, and conference halls.",
      stay: "Stay",
      rooms: "Rooms",
      booking: "Online booking",
      delivery: "Restaurant delivery",
      offer: "Commercial offer",
      house: "Hotel",
      spa: "SPA & pool",
      halls: "Conference halls",
      photos: "Photos",
      amenities: "Amenities",
      desk: "Contact",
      contacts: "Contacts",
      video: "Video tour",
      legal: "© 2026 Garden Hotel & SPA",
      legal2: "Reception 24/7 · breakfast included",
    },
  },
};

const pages = [
  { id: "home", href: "index.html", key: "home" },
  { id: "rooms", href: "rooms.html", key: "rooms" },
  { id: "spa", href: "spa.html", key: "spa" },
  { id: "events", href: "events.html", key: "events" },
  { id: "photos", href: "photos.html", key: "photos" },
  { id: "contacts", href: "contacts.html", key: "contacts" },
];

const BOOKING = "https://ghs.kg/booking/";

function todayPlus(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function lookup(lang, path) {
  let value = dict[lang];
  path.split(".").forEach((k) => {
    value = value?.[k];
  });
  return value;
}

function applyLang(lang) {
  const t = dict[lang] || dict.ru;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = lookup(lang, el.dataset.i18n);
    if (typeof value === "string") el.textContent = value;
  });
  document.querySelectorAll(".lang button").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });
  const guests = document.querySelector("#guests");
  if (guests) {
    [...guests.options].forEach((opt, i) => {
      opt.textContent = t.guestOptions[i];
    });
  }
  const menuBtn = document.querySelector(".menu-btn");
  if (menuBtn) menuBtn.setAttribute("aria-label", t.menu);
  localStorage.setItem("ghs-lang", lang);
}

function initHeader() {
  const page = document.body.dataset.page;
  const lang = localStorage.getItem("ghs-lang") || "ru";
  const t = dict[lang];
  const root = document.querySelector(".site-header");
  if (!root) return;
  root.innerHTML = `
    <div class="header-inner wrap">
      <a class="brand" href="index.html">
        <img src="img/logo.png" alt="Garden Hotel & SPA">
        <span class="brand-name">
          <strong>GARDEN</strong>
          <span data-i18n="brandSub">${t.brandSub}</span>
        </span>
      </a>
      <div class="header-actions">
        <div class="lang" role="group" aria-label="${t.lang}">
          <button type="button" data-lang="ru" aria-pressed="${lang === "ru"}">RU</button>
          <button type="button" data-lang="en" aria-pressed="${lang === "en"}">EN</button>
        </div>
        <a class="btn" href="${BOOKING}" data-i18n="book">${t.book}</a>
        <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="${t.menu}"><span></span></button>
      </div>
    </div>
    <nav class="nav" id="site-nav">
      ${pages
        .map(
          (p) =>
            `<a href="${p.href}" ${p.id === page ? 'aria-current="page"' : ""} data-i18n="nav.${p.key}">${t.nav[p.key]}</a>`
        )
        .join("")}
    </nav>
  `;
}

function initFolio() {
  const folio = document.querySelector("[data-folio]");
  if (!folio) return;
  const t = dict[localStorage.getItem("ghs-lang") || "ru"];
  folio.innerHTML = `
    <div class="folio-spine" data-i18n="folio">${t.folio}</div>
    <form action="${BOOKING}" method="get">
      <div class="field">
        <label for="arrive" data-i18n="arrive">${t.arrive}</label>
        <input id="arrive" name="arrive" type="date" required value="${todayPlus(0)}">
      </div>
      <div class="field">
        <label for="depart" data-i18n="depart">${t.depart}</label>
        <input id="depart" name="depart" type="date" required value="${todayPlus(1)}">
      </div>
      <div class="field">
        <label for="guests" data-i18n="guests">${t.guests}</label>
        <select id="guests" name="guests">
          ${t.guestOptions.map((label, i) => `<option value="${i + 1}" ${i === 1 ? "selected" : ""}>${label}</option>`).join("")}
        </select>
      </div>
      <button class="btn" type="submit" data-i18n="find">${t.find}</button>
    </form>
  `;
}

function initFooter() {
  const footer = document.querySelector(".site-footer .wrap");
  if (!footer) return;
  const t = dict[localStorage.getItem("ghs-lang") || "ru"].footer;
  footer.innerHTML = `
    <div class="footer-grid">
      <div>
        <h2>Garden Hotel & SPA</h2>
        <p class="serif" data-i18n="footer.blurb">${t.blurb}</p>
        <p><a href="tel:+996770978850">+996 770 978 850</a><br><a href="mailto:g.hotelkg@gmail.com">g.hotelkg@gmail.com</a></p>
      </div>
      <div>
        <h3 data-i18n="footer.stay">${t.stay}</h3>
        <div class="footer-links">
          <a href="rooms.html" data-i18n="footer.rooms">${t.rooms}</a>
          <a href="https://ghs.kg/booking/" data-i18n="footer.booking">${t.booking}</a>
          <a href="https://ghs.kg/menu/" data-i18n="footer.delivery">${t.delivery}</a>
          <a href="https://ghs.kg/static/files/offer.pdf" data-i18n="footer.offer">${t.offer}</a>
        </div>
      </div>
      <div>
        <h3 data-i18n="footer.house">${t.house}</h3>
        <div class="footer-links">
          <a href="spa.html" data-i18n="footer.spa">${t.spa}</a>
          <a href="events.html" data-i18n="footer.halls">${t.halls}</a>
          <a href="photos.html" data-i18n="footer.photos">${t.photos}</a>
          <a href="amenities.html" data-i18n="footer.amenities">${t.amenities}</a>
        </div>
      </div>
      <div>
        <h3 data-i18n="footer.desk">${t.desk}</h3>
        <div class="footer-links">
          <a href="contacts.html" data-i18n="footer.contacts">${t.contacts}</a>
          <a href="https://www.instagram.com/garden_hotel_spa/">Instagram</a>
          <a href="https://www.facebook.com/garden_hotel_spa-101337004636940/">Facebook</a>
          <a href="https://ghs.kg/video/" data-i18n="footer.video">${t.video}</a>
        </div>
      </div>
    </div>
    <div class="legal">
      <span data-i18n="footer.legal">${t.legal}</span>
      <span data-i18n="footer.legal2">${t.legal2}</span>
      <a class="made-by" href="https://github.com/tipilek2020-ai" target="_blank" rel="noopener" title="losdek on GitHub"><span class="mark">L</span> made by losdek</a>
    </div>
  `;
}

function initMobileBar() {
  if (document.querySelector(".mobile-bar")) return;
  const t = dict[localStorage.getItem("ghs-lang") || "ru"];
  const bar = document.createElement("div");
  bar.className = "mobile-bar";
  bar.innerHTML = `
    <a href="tel:+996770978850" data-i18n="call">${t.call}</a>
    <a href="${BOOKING}" data-i18n="book">${t.book}</a>
  `;
  document.body.appendChild(bar);
}

function initReveal() {
  const targets = document.querySelectorAll(
    ".section, .room-card, .hall-card, .stat, .panel, .review, .event-card, .amenity, .price-card, .contact-card"
  );
  if (!targets.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  targets.forEach((el) => io.observe(el));
}

document.addEventListener("click", (e) => {
  const menuBtn = e.target.closest(".menu-btn");
  if (menuBtn) {
    const nav = document.getElementById("site-nav");
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  }
  if (e.target.closest(".nav a")) {
    document.getElementById("site-nav")?.classList.remove("open");
    document.body.classList.remove("menu-open");
    document.querySelector(".menu-btn")?.setAttribute("aria-expanded", "false");
  }
  const langBtn = e.target.closest(".lang button");
  if (langBtn) applyLang(langBtn.dataset.lang);
});

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("ghs-lang")) localStorage.setItem("ghs-lang", "ru");
  initHeader();
  initFolio();
  initFooter();
  initMobileBar();
  applyLang(localStorage.getItem("ghs-lang") || "ru");
  initReveal();

  const lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    document.querySelectorAll("[data-full]").forEach((link) => {
      link.addEventListener("click", (ev) => {
        ev.preventDefault();
        lightbox.querySelector("img").src = link.getAttribute("href");
        lightbox.classList.add("open");
      });
    });
    lightbox.querySelector("button").addEventListener("click", () => lightbox.classList.remove("open"));
    lightbox.addEventListener("click", (ev) => {
      if (ev.target === lightbox) lightbox.classList.remove("open");
    });
  }
});
