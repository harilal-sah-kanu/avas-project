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
  const checkInInput = document.createElement("input");
  checkInInput.type = "date";
  checkInInput.className = "form-control mb-2";
  checkInInput.style.maxWidth = "160px";
  checkInInput.style.display = "inline-block";
  checkInInput.min = new Date().toISOString().split("T")[0];
  checkInInput.id = "checkInDate";
  checkInInput.placeholder = "Check-in";

  const checkOutInput = document.createElement("input");
  checkOutInput.type = "date";
  checkOutInput.className = "form-control mb-2 ms-2";
  checkOutInput.style.maxWidth = "160px";
  checkOutInput.style.display = "inline-block";
  checkOutInput.min = new Date().toISOString().split("T")[0];
  checkOutInput.id = "checkOutDate";
  checkOutInput.placeholder = "Check-out";

  // Replace the single input with two
  calendar.parentNode.replaceChild(checkInInput, calendar);
  checkInInput.parentNode.insertBefore(checkOutInput, checkInInput.nextSibling);

  function calculate() {
    checkIn = checkInInput.value;
    checkOut = checkOutInput.value;
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
