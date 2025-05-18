// flashMessage.js - Auto-hide flash messages and close button logic
(function () {
  // Auto-hide flash messages after 4 seconds
  setTimeout(() => {
    document.querySelectorAll(".flash-message").forEach((el) => {
      el.style.display = "none";
    });
  }, 4000);

  // Close button logic (delegated for dynamically rendered messages)
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("close-btn")) {
      const parent = e.target.closest(".flash-message");
      if (parent) parent.style.display = "none";
    }
  });
})();
