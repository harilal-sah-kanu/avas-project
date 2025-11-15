const Booking = require("../models/booking");
const Listing = require("../models/listing");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { id } = req.params; // listing id
    const { checkIn, checkOut, guests } = req.body;

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      req.flash("error", "Check-in date cannot be in the past");
      return res.redirect(`/listings/${id}`);
    }

    if (checkOutDate <= checkInDate) {
      req.flash("error", "Check-out date must be after check-in date");
      return res.redirect(`/listings/${id}`);
    }

    // Check if dates are already booked
    const conflictingBooking = await Booking.findOne({
      listing: id,
      status: { $in: ["confirmed", "pending"] },
      $or: [
        { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } },
      ],
    });

    if (conflictingBooking) {
      req.flash("error", "Selected dates are not available");
      return res.redirect(`/listings/${id}`);
    }

    // Get listing for price calculation
    const listing = await Listing.findById(id).populate('owner');
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    // Prevent owner from booking their own property
    if (listing.owner._id.equals(req.user._id)) {
      req.flash("error", "You cannot book your own property");
      return res.redirect(`/listings/${id}`);
    }

    // Calculate nights and total price
    const totalNights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = listing.price * totalNights;
    const TAX_RATE = 0.18; // 18% GST
    const taxAmount = totalPrice * TAX_RATE;
    const totalWithTax = totalPrice + taxAmount;

    // Create booking
    const newBooking = new Booking({
      listing: id,
      user: req.user._id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalNights,
      totalPrice,
      taxAmount,
      totalWithTax,
      guests: guests || 1,
      status: "confirmed",
    });

    await newBooking.save();
    req.flash("success", "Booking confirmed successfully!");
    res.redirect("/bookings");
  } catch (error) {
    console.error("Booking error:", error);
    req.flash("error", "Failed to create booking");
    res.redirect(`/listings/${req.params.id}`);
  }
};

// Get all bookings for logged-in user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("listing")
      .sort({ createdAt: -1 });

    // Filter out bookings with deleted listings and update their status
    const validBookings = [];
    for (const booking of bookings) {
      if (!booking.listing) {
        // Listing was deleted, mark booking as cancelled if not already
        if (booking.status !== 'cancelled') {
          booking.status = 'cancelled';
          await booking.save();
        }
      } else {
        validBookings.push(booking);
      }
    }

    res.render("bookings/index.ejs", { bookings: validBookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    req.flash("error", "Failed to load bookings");
    res.redirect("/listings");
  }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      req.flash("error", "Booking not found");
      return res.redirect("/bookings");
    }

    // Check if user owns the booking
    if (!booking.user.equals(req.user._id)) {
      req.flash("error", "You don't have permission to cancel this booking");
      return res.redirect("/bookings");
    }

    // Check if booking can be cancelled (not in the past)
    const today = new Date();
    if (booking.checkIn < today && booking.status !== "pending") {
      req.flash("error", "Cannot cancel past or ongoing bookings");
      return res.redirect("/bookings");
    }

    booking.status = "cancelled";
    await booking.save();

    req.flash("success", "Booking cancelled successfully");
    res.redirect("/bookings");
  } catch (error) {
    console.error("Error cancelling booking:", error);
    req.flash("error", "Failed to cancel booking");
    res.redirect("/bookings");
  }
};

// Get booked dates for a listing (for availability calendar)
const getBookedDates = async (req, res) => {
  try {
    const { id } = req.params;
    const bookings = await Booking.find({
      listing: id,
      status: { $in: ["confirmed", "pending"] },
    }).select("checkIn checkOut");

    const bookedRanges = bookings.map((b) => ({
      checkIn: b.checkIn,
      checkOut: b.checkOut,
    }));

    res.json({ bookedRanges });
  } catch (error) {
    console.error("Error fetching booked dates:", error);
    res.status(500).json({ error: "Failed to fetch booked dates" });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  cancelBooking,
  getBookedDates,
};
