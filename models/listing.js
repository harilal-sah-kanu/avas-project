const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const Review = require('./review');
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

});

// // Middleware to validate images

// listingSchema.pre("validate", function (next) {
//   if (!this.image || this.image.trim() === "") {
//     this.image =
//       "https://ik.imagekit.io/tvlk/image/imageResource/2024/06/21/1718957715688-26316a3442d27400e8a6919f75237573.jpeg?tr=q-75";
//   }
//   next();
// });


listingSchema.post("findOneAndDelete", async (listing) => {

  if(listing) {
    await Review.deleteMany({ _id: {$in: listing.reviews}});
  }

});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
