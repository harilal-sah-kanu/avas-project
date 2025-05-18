// footer.js - Footer year, socials animation, floating leaves, back to top button
(function () {
  // Set current year
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Social icon bounce
  document.querySelectorAll(".footer-social-link").forEach((link) => {
    link.addEventListener("mouseenter", () =>
      link.querySelector("i").classList.add("fa-bounce")
    );
    link.addEventListener("mouseleave", () =>
      link.querySelector("i").classList.remove("fa-bounce")
    );
  });

  // Floating leaf animation
  const style = document.createElement("style");
  style.innerHTML = `@keyframes leafFloat { 0% { transform: translateY(0) rotate(-10deg);} 100% { transform: translateY(12px) rotate(10deg);} }`;
  document.head.appendChild(style);

  // Back to Top button logic
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) backToTopBtn.style.display = "inline-block";
      else backToTopBtn.style.display = "none";
    });
    backToTopBtn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  // Floating leaves effect for footer
  function createFooterLeaf() {
    const container = document.querySelector(".footer-leaf-effect-container");
    if (!container) return;
    const leaf = document.createElement("i");
    leaf.className = "fa-solid fa-leaf text-success position-absolute";
    leaf.style.left = Math.random() * 100 + "%";
    leaf.style.top = "-30px";
    leaf.style.fontSize = Math.random() * 1.1 + 1.1 + "rem";
    leaf.style.opacity = Math.random() * 0.5 + 0.5;
    leaf.style.transition = "transform 7s linear, opacity 7s linear";
    container.appendChild(leaf);
    setTimeout(() => {
      leaf.style.transform = `translateY(${60 + Math.random() * 60}px) rotate(${
        Math.random() * 60 - 30
      }deg)`;
      leaf.style.opacity = 0;
    }, 100);
    setTimeout(() => leaf.remove(), 7000);
  }
  setInterval(createFooterLeaf, 1500);
})();

// Listen for logout button click to clear welcome banner session flag
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const logoutForms = document.querySelectorAll('form[action="/logout"]');
    logoutForms.forEach((form) => {
      form.addEventListener("submit", function () {
        window.dispatchEvent(new Event("avas-logout"));
      });
    });
  });
})();
