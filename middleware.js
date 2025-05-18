const Listing = require("./models/listing");
const ExpressError = require("./utils/expressError.js");
const { listingSchema, reviewSchema } = require('./schema.js')

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in.");
        return res.redirect("/login");
    }
    next();
}

const saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

const isOwner = async (req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);

    if (!res.locals.currUser || !listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not owner of the listing!");
        return res.redirect(`/listings/${id}`);
    }
    next(); 
}

const validateListing = (req, res, next) => {
  // Ensure cityTags and features are always arrays before validation
  if (req.body.listing) {
    if (req.body.listing.cityTags && !Array.isArray(req.body.listing.cityTags)) {
      req.body.listing.cityTags = [req.body.listing.cityTags];
    }
    if (req.body.listing.features && !Array.isArray(req.body.listing.features)) {
      req.body.listing.features = [req.body.listing.features];
    }
  }
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
} 

module.exports = { isLoggedIn, saveRedirectUrl, isOwner, validateListing, validateReview };
