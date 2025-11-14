// flashMessage.js - Enhanced professional toast message handler
(function () {
  const AUTO_DISMISS_TIME = 5000; // 5 seconds

  // Get all flash messages
  const flashMessages = document.querySelectorAll(".flash-message");

  if (flashMessages.length === 0) return;

  // Auto-dismiss with smooth fade-out animation
  flashMessages.forEach((flashMessage) => {
    const autoDismissTimer = setTimeout(() => {
      dismissMessage(flashMessage);
    }, AUTO_DISMISS_TIME);

    // Store timer for potential clearing
    flashMessage.dataset.timer = autoDismissTimer;

    // Pause auto-dismiss on hover
    flashMessage.addEventListener("mouseenter", function () {
      clearTimeout(this.dataset.timer);
      // Pause progress bar animation
      const style = window.getComputedStyle(this, "::before");
      if (style) {
        this.style.setProperty("animation-play-state", "paused");
      }
    });

    // Resume auto-dismiss on mouse leave
    flashMessage.addEventListener("mouseleave", function () {
      const remainingTime = 2000; // Give 2 more seconds after hover
      this.dataset.timer = setTimeout(() => {
        dismissMessage(this);
      }, remainingTime);
      // Resume progress bar animation
      this.style.setProperty("animation-play-state", "running");
    });
  });

  // Close button handler with smooth animation
  document.addEventListener("click", function (e) {
    const closeBtn = e.target.closest(".close-btn");
    if (closeBtn) {
      const flashMessage = closeBtn.closest(".flash-message");
      if (flashMessage) {
        // Clear auto-dismiss timer
        clearTimeout(flashMessage.dataset.timer);
        dismissMessage(flashMessage);
      }
    }
  });

  // Function to dismiss message with animation
  function dismissMessage(element) {
    element.classList.add("flash-out");
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      element.remove();
    }, 400); // Match CSS animation duration
  }

  // Keyboard accessibility - dismiss on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      flashMessages.forEach((msg) => {
        if (msg.parentElement) {
          clearTimeout(msg.dataset.timer);
          dismissMessage(msg);
        }
      });
    }
  });
})();
