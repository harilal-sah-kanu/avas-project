// flashMessage.js - Enhanced toast message with smooth animations
(function () {
  const AUTO_DISMISS_TIME = 5000; // 5 seconds

  // Auto-dismiss with smooth fade-out animation
  setTimeout(() => {
    document.querySelectorAll(".flash-message").forEach((el) => {
      el.classList.add("flash-out");

      // Remove from DOM after animation completes
      setTimeout(() => {
        el.remove();
      }, 400); // Match animation duration
    });
  }, AUTO_DISMISS_TIME);

  // Close button with smooth animation
  document.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("close-btn") ||
      e.target.closest(".close-btn")
    ) {
      const parent = e.target.closest(".flash-message");
      if (parent) {
        parent.classList.add("flash-out");
        setTimeout(() => {
          parent.remove();
        }, 400);
      }
    }
  });

  // Optional: Pause auto-dismiss on hover
  document.querySelectorAll(".flash-message").forEach((el) => {
    let timeout;

    el.addEventListener("mouseenter", function () {
      // Pause progress bar animation
      this.style.animationPlayState = "paused";
      const after = window.getComputedStyle(this, "::after");
      if (after) {
        this.style.setProperty("--pause-animation", "paused");
      }
    });

    el.addEventListener("mouseleave", function () {
      // Resume progress bar animation
      this.style.animationPlayState = "running";
      this.style.setProperty("--pause-animation", "running");
    });
  });
})();
