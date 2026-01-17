(() => {
  "use strict";

  /* =====================
     UTILITIES
  ===================== */
  const $ = selector => document.querySelector(selector);
  const $$ = selector => document.querySelectorAll(selector);

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =====================
     PAGE FADE IN
  ===================== */
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 1s ease";

  window.addEventListener("load", () => {
    requestAnimationFrame(() => {
      document.body.style.opacity = "1";
    });
  });

  /* =====================
     SCROLL REVEAL SYSTEM
  ===================== */
  const revealElements = $$("[data-reveal]");

  if (!prefersReducedMotion && revealElements.length) {
    revealElements.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(50px)";
      el.style.transition = "0.8s cubic-bezier(.2,.8,.2,1)";
    });

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* =====================
     CARD MICRO-INTERACTIONS
  ===================== */
  const cards = $$(".card");

  cards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;

      card.style.transform = `
        perspective(800px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-6px)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });

  /* =====================
     HERO PARALLAX
  ===================== */
  const hero = $(".hero");

  if (hero && !prefersReducedMotion) {
    window.addEventListener("scroll", () => {
      const offset = window.scrollY * 0.25;
      hero.style.backgroundPosition = `center calc(50% + ${offset}px)`;
    });
  }

  /* =====================
     ACCESSIBILITY FOCUS FIX
  ===================== */
  document.addEventListener("keydown", e => {
    if (e.key === "Tab") {
      document.body.classList.add("user-is-tabbing");
    }
  });

})();
