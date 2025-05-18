// Controls the welcome banner visibility for logged-in users
(function () {
  const banner = document.getElementById("welcomeBanner");
  const closeBtn = document.getElementById("closeWelcomeBanner");
  if (!banner || !closeBtn) return;

  // Show the banner on every login/signup (not just once per session)
  if (sessionStorage.getItem("avasWelcomeBannerDismissed")) {
    banner.style.display = "none";
  } else {
    banner.style.display = "";
  }

  closeBtn.addEventListener("click", function () {
    banner.style.display = "none";
    sessionStorage.setItem("avasWelcomeBannerDismissed", "1");
  });

  // Listen for a custom event to clear the flag on logout
  window.addEventListener("avas-logout", function () {
    sessionStorage.removeItem("avasWelcomeBannerDismissed");
  });
})();
