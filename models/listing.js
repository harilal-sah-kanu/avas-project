const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const { string } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  image: {
    url: String,
    filename: String,
  },

  price: Number,
  location: String,
  country: String,

  features: [String],

  category: {
    type: String,
    enum: [
      "Trending",
      "Rooms",
      "Iconic Cities",
      "Mountains",
      "Castle",
      "Beach",
      "Camping",
      "Farms",
      "Nature",
      "Lake",
      "Winter",
      "House",
      "Apartment",
    ],
    default: "Trending",
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

// Text index for efficient search on title, description, and location
listingSchema.index({ title: "text", description: "text", location: "text" });

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
