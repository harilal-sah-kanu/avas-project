// JS for listings index page: category slider and tax toggle

document.addEventListener("DOMContentLoaded", function () {
  // Category slider arrows
  const categorySlider = document.querySelector(".categories-slider");
  const leftArrow = document.querySelector(".scroll-arrow.left");
  const rightArrow = document.querySelector(".scroll-arrow.right");
  const scrollAmount = 200;

  if (categorySlider && leftArrow && rightArrow) {
    function updateArrows() {
      if (categorySlider.scrollLeft <= 0) {
        leftArrow.style.display = 'none';
      } else {
        leftArrow.style.display = 'flex';
      }
      
      if (categorySlider.scrollLeft + categorySlider.offsetWidth >= categorySlider.scrollWidth - 2) {
        rightArrow.style.display = 'none';
      } else {
        rightArrow.style.display = 'flex';
      }
    }

    rightArrow.addEventListener("click", () => {
      categorySlider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
    
    leftArrow.addEventListener("click", () => {
      categorySlider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
    
    categorySlider.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    updateArrows();
  }

  // Taxes toggle logic: show tax in each listing
  const taxSwitch = document.getElementById("switchCheckDefault");
  const priceElements = document.querySelectorAll(".listing-price");
  const taxAmountElements = document.querySelectorAll(".tax-amount");
  const TAX_RATE = 0.13;

  if (taxSwitch && priceElements.length > 0) {
    function showTaxInListings() {
      priceElements.forEach((el, idx) => {
        const price = parseFloat(el.getAttribute("data-price"));
        const taxEl = taxAmountElements[idx];
        if (taxSwitch.checked) {
          const total = price + price * TAX_RATE;
          taxEl.innerHTML = `Total after tax: <b>₹${total.toLocaleString(
            "en-IN",
            { maximumFractionDigits: 0 }
          )}</b>`;
          taxEl.style.display = "block";
        } else {
          taxEl.innerHTML = "";
          taxEl.style.display = "none";
        }
      });
    }
    taxSwitch.addEventListener("change", showTaxInListings);
  }

  // Modal category selection
  const categoryOptions = document.querySelectorAll('.category-option');
  const categoryInput = document.getElementById('categoryInput');

  if (categoryOptions.length > 0 && categoryInput) {
    categoryOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Remove selected class from all options
        categoryOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class to clicked option
        this.classList.add('selected');
        
        // Update hidden input value
        categoryInput.value = this.getAttribute('data-category');
      });
    });
  }
});
