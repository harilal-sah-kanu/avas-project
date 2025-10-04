// Pagination helper: Scroll to top when page changes
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("page");

  // If page parameter exists (pagination was used), scroll to listings
  if (page && page > 1) {
    // Smooth scroll to the listings section
    setTimeout(() => {
      const listingsSection = document.querySelector(".row.row-cols-1");
      if (listingsSection) {
        listingsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  }
});
