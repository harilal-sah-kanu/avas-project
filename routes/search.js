const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || !q.trim()) {
      req.flash("error", "Please enter a search term.");
      return res.redirect("/listings");
    }
    const Listing = require("../models/listing.js");
    const regex = new RegExp(q, "i");
    const results = await Listing.find({
      $or: [{ title: regex }, { description: regex }],
    });
    res.render("listings/searchResult", { results, query: q });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
