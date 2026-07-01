const menuButton = document.querySelector(".menu-button");
const globalNav = document.querySelector(".global-nav");
const progressBar = document.querySelector(".scroll-progress span");
const heroImage = document.querySelector(".hero-image");
const finalImage = document.querySelector(".final-action > img");
const stickyCta = document.querySelector(".sticky-cta");
const scheduleTabs = document.querySelectorAll(".schedule-tab");
const schedulePanels = document.querySelectorAll(".schedule-panel");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

menuButton.addEventListener("click", () => {
  const opening = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(opening));
  globalNav.classList.toggle("is-open", opening);
});

globalNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    globalNav.classList.remove("is-open");
  });
});

scheduleTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetId = tab.dataset.schedule;
    scheduleTabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-selected", String(selected));
    });
    schedulePanels.forEach((panel) => {
      const selected = panel.id === targetId;
      panel.classList.toggle("is-active", selected);
      panel.hidden = !selected;
    });
  });
});

const updateScrollEffects = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressBar.style.width = `${progress}%`;

  if (!reducedMotion) {
    heroImage.style.transform = `translate3d(0, ${Math.min(window.scrollY * 0.12, 85)}px, 0)`;
    const finalRect = finalImage.parentElement.getBoundingClientRect();
    if (finalRect.top < window.innerHeight && finalRect.bottom > 0) {
      finalImage.style.transform = `translate3d(0, ${finalRect.top * 0.05}px, 0)`;
    }
  }

  stickyCta.hidden = window.scrollY < window.innerHeight * 0.65;
};

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScrollEffects();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

const revealElements = document.querySelectorAll(".reveal");
if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
  revealElements.forEach((element) => observer.observe(element));
}

updateScrollEffects();
