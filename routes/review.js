const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing");
const { validateReview, isLoggedIn } = require("../middleware.js");
const { postReview, destoryReview } = require("../controllers/review.js");






//Post Review:
router.post("/", isLoggedIn, validateReview, wrapAsync(postReview));

//delete review route:
router.delete("/:reviewId", isLoggedIn, wrapAsync(destoryReview));

module.exports = router;