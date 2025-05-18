const Listing = require("../models/listing");

const index = async (req, res) => {
  const { category, minPrice, maxPrice, sort } = req.query;
  let filter = {};
  if (category && category !== "") {
    filter.category = category;
  }
  if (minPrice) {
    filter.price = { ...filter.price, $gte: Number(minPrice) };
  }
  if (maxPrice) {
    filter.price = { ...filter.price, $lte: Number(maxPrice), ...filter.price };
  }
  let query = Listing.find(filter);
  if (sort === "price-asc") {
    query = query.sort({ price: 1 });
  } else if (sort === "price-desc") {
    query = query.sort({ price: -1 });
  } else if (sort === "newest") {
    query = query.sort({ createdAt: -1 });
  }
  const allListing = await query;
  res.render("listings/index.ejs", {
    allListing,
    minPrice,
    maxPrice,
    category,
    sort,
  });
};

const renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

const showListing = async (req, res) => {
  const { id } = req.params;
  const post = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!post) {
    req.flash("error", "Requested listing does not exist");
    res.redirect("/listings");
  }
  // Fetch similar properties (same category, not this one)
  const similarListings = await Listing.find({
    category: post.category,
    _id: { $ne: post._id },
  }).limit(4);
  res.render("listings/show.ejs", { post, similarListings });
};

const postListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

const editListing = async (req, res) => {
  const { id } = req.params;
  const curntListing = await Listing.findById(id);
  if (!curntListing) {
    req.flash("error", "Requested listing does not exist");
    res.redirect("/listings");
  }

  let orgImageUrl = curntListing.image.url;
  orgImageUrl = orgImageUrl.replace("/upload", "/upload/w_250");

  res.render("listings/edit.ejs", { curntListing, orgImageUrl });
};

const updateListing = async (req, res) => {
  const { id } = req.params;
  const updatedData = { ...req.body.listing };

  const listing = await Listing.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${id}`);
};

const deleteListing = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Sucessfully!");
  res.redirect("/listings");
};

module.exports = {
  index,
  renderNewForm,
  showListing,
  postListing,
  editListing,
  updateListing,
  deleteListing,
};
