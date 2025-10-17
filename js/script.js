// Offcanvas Smoothness
const navLinks = document.querySelectorAll(".nav-link[data-nav]");

function setActive(navKey) {
  navLinks.forEach((l) =>
    l.classList.toggle("active", l.dataset.nav === navKey)
  );
}

document.addEventListener("click", (e) => {
  const link = e.target.closest(".nav-link[data-nav]");
  if (!link) return;

  const href = (link.getAttribute("href") || "").trim();
  const key = link.dataset.nav;

  if (key) setActive(key);

  if (href.startsWith("#")) {
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  } else if (href === "" || href === "#") {
    e.preventDefault();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = [
    {
      el:
        document.querySelector("#top") ||
        document.querySelector(".banner-section"),
      key: "discover",
    },
    { el: document.querySelector("#slider-section"), key: "marketplace" },
    { el: document.querySelector("#about"), key: "about" },
  ].filter((s) => s.el);

  sections.forEach((s) => (s.el.dataset.navKey = s.key));

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((en) => en.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        const key = visible.target.dataset.navKey;
        setActive(key);
      }
    },
    {
      root: null,
      threshold: [0.35, 0.5, 0.65],
      rootMargin: "-80px 0px -40% 0px",
    }
  );

  sections.forEach((s) => io.observe(s.el));

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY < 120) setActive("discover");
    },
    { passive: true }
  );
});

// Counter
function runCounters() {
  const counters = document.querySelectorAll(".stat-num");
  const duration = 2000;

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const step = Math.ceil(target / (duration / 20));
    counter.textContent = formatNumber(target);

    const timer = setInterval(() => {
      count += step;
      if (count >= target) {
        counter.textContent = formatNumber(target);
        clearInterval(timer);
      } else {
        counter.textContent = formatNumber(count);
      }
    }, 20);
  });

  function formatNumber(num) {
    if (num >= 1000 && num < 1000000) return Math.floor(num / 1000) + "k+";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M+";
    return num;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const bannerSection = document.querySelector(".banner-section");
  if (!bannerSection) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounters();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(bannerSection);
});

// Swiper JS
document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".auction-swiper");
  const totalSlides = root ? root.querySelectorAll(".swiper-slide").length : 0;

  new Swiper(".auction-swiper", {
    slidesPerView: 3,
    spaceBetween: 25,
    speed: 500,
    loop: true,
    loopAdditionalSlides: Math.max(6, totalSlides),
    watchOverflow: false,
    loopPreventsSlide: false,
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 16 },
      576: { slidesPerView: 1.25, spaceBetween: 18 },
      768: { slidesPerView: 2, spaceBetween: 22 },
      992: { slidesPerView: 3, spaceBetween: 28 },
    },
  });
});


