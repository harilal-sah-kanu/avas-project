const express = require("express");
const router = express.Router();

// Escape special regex characters to prevent ReDoS attacks
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

router.get("/", async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || !q.trim()) {
      req.flash("error", "Please enter a search term.");
      return res.redirect("/listings");
    }
    const Listing = require("../models/listing.js");

    // Prefer text search (requires text index). Fallback to safe regex substring search.
    try {
      const textResults = await Listing.find(
        { $text: { $search: q } },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .limit(50)
        .populate('reviews');

      if (textResults.length) {
        return res.render("listings/searchResult", {
          results: textResults,
          query: q,
        });
      }
    } catch (e) {
      // If $text fails (no index), fall through to regex fallback
      console.warn(
        "Text search failed or index missing, falling back to regex:",
        e.message
      );
    }

    // Regex fallback (escape input to avoid ReDoS / special-chars)
    const regex = new RegExp(escapeRegex(q), "i");
    const results = await Listing.find({
      $or: [{ title: regex }, { description: regex }],
    }).limit(50).populate('reviews');

    res.render("listings/searchResult", { results, query: q });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
