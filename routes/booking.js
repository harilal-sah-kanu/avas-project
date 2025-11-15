const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const {
  createBooking,
  getUserBookings,
  cancelBooking,
  getBookedDates,
} = require("../controllers/booking");

// Create a booking
router.post("/listings/:id/book", isLoggedIn, createBooking);

// Get user's bookings
router.get("/bookings", isLoggedIn, getUserBookings);

// Cancel a booking
router.delete("/bookings/:id", isLoggedIn, cancelBooking);

// Get booked dates for a listing (AJAX)
router.get("/listings/:id/booked-dates", getBookedDates);

module.exports = router;
