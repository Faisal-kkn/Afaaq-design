/* =========================================================
   AFAAQ STATIC WEBSITE CONFIGURATION
   Add the final client details here when confirmed.
   Empty fields are automatically hidden from the UI.
========================================================= */
const SITE_CONFIG = {
  phone: "00971568610778",
  landline: "0097143324257",
  whatsapp: "00971568610778",
  email: "info@afaaqbusinessdesign.com",
  address:
    "Al Mezan Tower - Muhaisnah 4 Amman St - Dubai - United Arab Emirates",
  hours: "",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Al%20Mezan%20Tower%20Muhaisnah%204%20Amman%20St%20Dubai%20United%20Arab%20Emirates",
  whatsappMessage:
    "Hello AFAAQ, I would like to know more about your customized Belgian chocolate and private-label solutions.",
};

const header = document.getElementById("siteHeader");
const menuBtn = document.getElementById("menuBtn");
const mobilePanel = document.getElementById("mobilePanel");
const whatsappFloat = document.getElementById("whatsappFloat");
const footerContacts = document.getElementById("footerContacts");
const year = document.getElementById("year");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

if (year) year.textContent = new Date().getFullYear();

/* ---------------------------------------------------------
   Contact / WhatsApp configuration
--------------------------------------------------------- */
function cleanNumber(value) {
  return String(value || "").replace(/[^\d]/g, "");
}

function internationalDigits(value) {
  const digits = cleanNumber(value);
  return digits.startsWith("00") ? digits.slice(2) : digits;
}

function telHref(value) {
  const digits = internationalDigits(value);
  return digits ? `tel:+${digits}` : "#";
}

function formatUaeNumber(value) {
  const digits = internationalDigits(value);
  if (!digits.startsWith("971")) return value;
  const local = digits.slice(3);
  if (local.length === 8 && local.startsWith("4")) {
    return `+971 ${local.slice(0, 1)} ${local.slice(1, 4)} ${local.slice(4)}`;
  }
  if (local.length === 9) {
    return `+971 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5)}`;
  }
  return `+${digits}`;
}

const whatsappNumber = internationalDigits(SITE_CONFIG.whatsapp);
const whatsappUrl = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`
  : "#contact";

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  link.href = whatsappUrl;
  if (whatsappNumber) {
    link.target = "_blank";
    link.rel = "noopener";
  }
});

if (whatsappNumber && whatsappFloat) {
  whatsappFloat.classList.add("visible");
}

function showContact(key, value, setup) {
  if (!value) return;
  const row = document.querySelector(`[data-contact="${key}"]`);
  if (!row) return;
  row.classList.add("visible");
  row.closest(".contact-list")?.classList.add("has-contact");
  setup();
}

showContact("phone", SITE_CONFIG.phone, () => {
  const link = document.getElementById("phoneLink");
  link.textContent = formatUaeNumber(SITE_CONFIG.phone);
  link.href = telHref(SITE_CONFIG.phone);
});

showContact("landline", SITE_CONFIG.landline, () => {
  const link = document.getElementById("landlineLink");
  link.textContent = formatUaeNumber(SITE_CONFIG.landline);
  link.href = telHref(SITE_CONFIG.landline);
});

showContact("email", SITE_CONFIG.email, () => {
  const link = document.getElementById("emailLink");
  link.textContent = SITE_CONFIG.email;
  link.href = `mailto:${SITE_CONFIG.email}`;
});

showContact("address", SITE_CONFIG.address, () => {
  document.getElementById("addressText").textContent = SITE_CONFIG.address;
});

showContact("hours", SITE_CONFIG.hours, () => {
  document.getElementById("hoursText").textContent = SITE_CONFIG.hours;
});

["directionsBtn", "mapDirectionsBtn"].forEach((id) => {
  const link = document.getElementById(id);
  if (link) link.href = SITE_CONFIG.googleMapsUrl;
});

if (
  footerContacts &&
  (SITE_CONFIG.phone || SITE_CONFIG.whatsapp || SITE_CONFIG.email)
) {
  footerContacts.innerHTML = "";

  if (SITE_CONFIG.phone) {
    const phone = document.createElement("a");
    phone.href = telHref(SITE_CONFIG.phone);
    phone.textContent = formatUaeNumber(SITE_CONFIG.phone);
    footerContacts.appendChild(phone);
  }

  if (SITE_CONFIG.landline) {
    const landline = document.createElement("a");
    landline.href = telHref(SITE_CONFIG.landline);
    landline.textContent = formatUaeNumber(SITE_CONFIG.landline);
    footerContacts.appendChild(landline);
  }

  if (SITE_CONFIG.email) {
    const email = document.createElement("a");
    email.href = `mailto:${SITE_CONFIG.email}`;
    email.textContent = SITE_CONFIG.email;
    footerContacts.appendChild(email);
  }
}

const socialLinks = document.getElementById("socialLinks");
const footerSocials = document.getElementById("footerSocials");

Object.entries(SITE_CONFIG.social || {}).forEach(([label, url]) => {
  if (!url) return;

  if (socialLinks) {
    const link = document.createElement("a");
    link.className = "social-link";
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = label;
    socialLinks.appendChild(link);
  }

  if (footerSocials) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = label;
    footerSocials.appendChild(link);
  }
});

/* ---------------------------------------------------------
   Mobile navigation
--------------------------------------------------------- */
function setMenu(open) {
  if (!menuBtn || !mobilePanel) return;
  mobilePanel.classList.toggle("open", open);
  menuBtn.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute(
    "aria-label",
    open ? "Close navigation menu" : "Open navigation menu",
  );
  document.body.classList.toggle("menu-open", open);
}

menuBtn?.addEventListener("click", () => {
  setMenu(!mobilePanel.classList.contains("open"));
});

mobilePanel?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobilePanel?.classList.contains("open")) {
    setMenu(false);
    menuBtn?.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980 && mobilePanel?.classList.contains("open")) {
    setMenu(false);
  }
});

/* ---------------------------------------------------------
   Sticky header state
--------------------------------------------------------- */
function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 28);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

/* ---------------------------------------------------------
   Reveal animations
--------------------------------------------------------- */
if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
  );

  document
    .querySelectorAll(".reveal")
    .forEach((element) => revealObserver.observe(element));
} else {
  document
    .querySelectorAll(".reveal")
    .forEach((element) => element.classList.add("show"));
}

/* ---------------------------------------------------------
   Active navigation / scroll spy
   More reliable for sections with different heights
--------------------------------------------------------- */

const navLinks = [
  ...document.querySelectorAll(
    '.desktop-nav a[href^="#"]:not(.btn), .mobile-links a[href^="#"]:not(.btn)',
  ),
];

/* Get only sections that actually exist in the navigation */
const sectionIds = [
  ...new Set(
    navLinks
      .map((link) => link.getAttribute("href"))
      .filter((href) => href && href.startsWith("#"))
      .map((href) => href.slice(1)),
  ),
];

const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

let activeSectionId = "";
let scrollSpyTicking = false;

/* ---------------------------------------------------------
   Apply active state
--------------------------------------------------------- */
function setActiveNav(sectionId) {
  if (!sectionId || activeSectionId === sectionId) return;

  activeSectionId = sectionId;

  navLinks.forEach((link) => {
    const linkSection = link.getAttribute("href")?.slice(1);
    const isActive = linkSection === sectionId;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

/* ---------------------------------------------------------
   Find which section currently owns the viewport
--------------------------------------------------------- */
function updateActiveSection() {
  if (!sections.length) return;

  const headerHeight = header?.offsetHeight || 86;

  /*
    The active section is determined using an imaginary
    horizontal line inside the viewport.

    This is more reliable than IntersectionObserver when:
    - sections have different heights
    - layouts change responsively
    - images resize
    - content becomes taller/shorter
  */
  const availableHeight = Math.max(0, window.innerHeight - headerHeight);

  const triggerLine =
    headerHeight + Math.min(190, Math.max(90, availableHeight * 0.28));

  let currentSection = sections[0];

  for (const section of sections) {
    const rect = section.getBoundingClientRect();

    /*
      As soon as the section reaches the trigger line,
      it becomes the current section.
    */
    if (rect.top <= triggerLine) {
      currentSection = section;
    } else {
      break;
    }
  }

  /*
    Important near the bottom of the page:
    ensure Contact remains active when the user reaches
    the bottom/footer area.
  */
  const nearPageBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 8;

  if (nearPageBottom && sections.length) {
    currentSection = sections[sections.length - 1];
  }

  setActiveNav(currentSection.id);
}

/* ---------------------------------------------------------
   Throttle scroll work with requestAnimationFrame
--------------------------------------------------------- */
function requestScrollSpyUpdate() {
  if (scrollSpyTicking) return;

  scrollSpyTicking = true;

  requestAnimationFrame(() => {
    updateActiveSection();
    scrollSpyTicking = false;
  });
}

/* ---------------------------------------------------------
   Events
--------------------------------------------------------- */
window.addEventListener("scroll", requestScrollSpyUpdate, {
  passive: true,
});

window.addEventListener("resize", requestScrollSpyUpdate);

window.addEventListener("load", updateActiveSection);

window.addEventListener("hashchange", updateActiveSection);

/* Immediately highlight the clicked item */
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const sectionId = link.getAttribute("href")?.slice(1);

    if (sectionId) {
      setActiveNav(sectionId);
    }
  });
});

/* Initial state */
updateActiveSection();

/* ---------------------------------------------------------
   Lightweight hero depth / parallax
--------------------------------------------------------- */
if (!prefersReducedMotion && finePointer) {
  const hero = document.querySelector(".hero");
  const heroVisual = document.querySelector(".hero-visual");
  const parallaxItems = [...document.querySelectorAll("[data-parallax]")];

  hero?.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    if (heroVisual) {
      heroVisual.style.setProperty("--px", `${x * 8}px`);
      heroVisual.style.setProperty("--py", `${y * 6}px`);
    }
  });

  hero?.addEventListener("pointerleave", () => {
    heroVisual?.style.setProperty("--px", "0px");
    heroVisual?.style.setProperty("--py", "0px");
  });

  let ticking = false;
  const updateParallax = () => {
    const heroRect = hero?.getBoundingClientRect();
    if (heroRect && heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.parallax || 0.1);
        const offset = Math.max(
          -34,
          Math.min(34, -heroRect.top * speed * 0.12),
        );
        item.style.setProperty("--parallax-y", `${offset}px`);
      });
    }
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true },
  );

  updateParallax();
}

/* ---------------------------------------------------------
   Subtle magnetic buttons (desktop pointer only)
--------------------------------------------------------- */
if (!prefersReducedMotion && finePointer) {
  document.querySelectorAll(".btn-magnetic").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      button.style.setProperty("--mx", `${x * 0.07}px`);
      button.style.setProperty("--my", `${y * 0.08}px`);
    });

    button.addEventListener("pointerleave", () => {
      button.style.setProperty("--mx", "0px");
      button.style.setProperty("--my", "0px");
    });
  });
}
