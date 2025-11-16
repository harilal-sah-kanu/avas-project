// calendarCart.js - Calendar booking and cart calculation for show.ejs
(function () {
  const pricePerNight = Number(
    document.getElementById("calendarCart")?.dataset.price || 0
  );
  const taxRate = 0.13;
  const calendar = document.getElementById("bookingDates");
  const cart = document.getElementById("bookingCart");
  if (!calendar || !cart || !pricePerNight) return;

  // Support for date range: user selects check-in and check-out
  let checkIn = null,
    checkOut = null;

  // Create two date inputs for check-in and check-out
  const today = new Date().toISOString().split("T")[0];

  const checkInInput = document.createElement("input");
  checkInInput.type = "date";
  checkInInput.className = "form-control mb-2";
  checkInInput.style.maxWidth = "180px";
  checkInInput.style.display = "inline-block";
  checkInInput.min = today;
  checkInInput.id = "checkInDate";
  checkInInput.setAttribute("required", "required");
  checkInInput.setAttribute("aria-label", "Check-in date");
  checkInInput.setAttribute("pattern", "\\d{4}-\\d{2}-\\d{2}");
  // For mobile compatibility
  checkInInput.setAttribute("onfocus", "(this.type='date')");

  const checkInLabel = document.createElement("label");
  checkInLabel.setAttribute("for", "checkInDate");
  checkInLabel.className = "form-label d-block mb-1 fw-semibold";
  checkInLabel.style.fontSize = "0.9rem";
  checkInLabel.innerHTML =
    '<i class="fa-solid fa-calendar-check text-success me-1"></i>Check-in:';

  const checkOutInput = document.createElement("input");
  checkOutInput.type = "date";
  checkOutInput.className = "form-control mb-2 ms-2";
  checkOutInput.style.maxWidth = "180px";
  checkOutInput.style.display = "inline-block";
  checkOutInput.min = today;
  checkOutInput.id = "checkOutDate";
  checkOutInput.setAttribute("required", "required");
  checkOutInput.setAttribute("aria-label", "Check-out date");
  checkOutInput.setAttribute("pattern", "\\d{4}-\\d{2}-\\d{2}");
  // For mobile compatibility
  checkOutInput.setAttribute("onfocus", "(this.type='date')");

  const checkOutLabel = document.createElement("label");
  checkOutLabel.setAttribute("for", "checkOutDate");
  checkOutLabel.className = "form-label d-block mb-1 fw-semibold ms-2";
  checkOutLabel.style.fontSize = "0.9rem";
  checkOutLabel.innerHTML =
    '<i class="fa-solid fa-calendar-xmark text-danger me-1"></i>Check-out:';

  // Create a container for better layout
  const dateContainer = document.createElement("div");
  dateContainer.className = "date-picker-container d-flex flex-wrap gap-3 mb-3";

  const checkInWrapper = document.createElement("div");
  checkInWrapper.className = "date-input-wrapper";
  checkInWrapper.appendChild(checkInLabel);
  checkInWrapper.appendChild(checkInInput);

  const checkOutWrapper = document.createElement("div");
  checkOutWrapper.className = "date-input-wrapper";
  checkOutWrapper.appendChild(checkOutLabel);
  checkOutWrapper.appendChild(checkOutInput);

  dateContainer.appendChild(checkInWrapper);
  dateContainer.appendChild(checkOutWrapper);

  // Replace the calendar element with the new container
  calendar.parentNode.replaceChild(dateContainer, calendar);

  function calculate() {
    checkIn = checkInInput.value;
    checkOut = checkOutInput.value;
    
    // Validate check-in date is not in the past
    if (checkIn) {
      const selectedDate = new Date(checkIn);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      
      if (selectedDate < todayDate) {
        checkInInput.value = '';
        alert('Check-in date cannot be in the past. Please select a valid date.');
        cart.innerHTML =
          '<span class="text-muted">Select check-in and check-out dates to estimate your total.</span>';
        return;
      }
    }
    
    if (!checkIn) {
      cart.innerHTML =
        '<span class="text-muted">Select check-in and check-out dates to estimate your total.</span>';
      return;
    }
    let nights = 1;
    if (checkOut) {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);
      nights = Math.max(
        1,
        Math.round((endDate - startDate) / (1000 * 60 * 60 * 24))
      );
      if (nights < 1) nights = 1;
    }
    const base = pricePerNight * nights;
    const tax = base * taxRate;
    const total = base + tax;
    cart.innerHTML = `
      <div class="cart-summary p-3 rounded bg-light border mt-3">
        <div><b>Base Price:</b> &#8377; ${base.toLocaleString(
          "en-NP"
        )} (${nights} night${nights > 1 ? "s" : ""})</div>
        <div class="text-success mt-1"><b>Tax (13%):</b> &#8377; ${tax.toLocaleString(
          "en-NP",
          { maximumFractionDigits: 2 }
        )}</div>
        <div class="mt-2 fs-5"><b>Total:</b> <span class="text-primary">&#8377; ${total.toLocaleString(
          "en-NP",
          { maximumFractionDigits: 2 }
        )}</span></div>
      </div>
    `;
  }

  checkInInput.addEventListener("change", function () {
    checkOutInput.min = checkInInput.value;
    calculate();
  });
  checkOutInput.addEventListener("change", calculate);
  calculate();
})();
