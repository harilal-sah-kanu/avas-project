const Joi = require("joi");
const joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().allow("", null),
    category: Joi.string()
      .valid(
        "Trending",
        "Rooms",
        "Iconic Cities",
        "Mountains",
        "Castle",
        "Arctics",
        "Camping",
        "Farms",
        "Hotels",
        "Beach",
        "Nature",
        "Winter",
        "Lake",
        "Apartment",
        "House",
        "Breakfast"
      )
      .required(),
  }).required(),
});

module.exports.reviewSchema = joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
