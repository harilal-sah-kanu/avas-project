const Listing = require("../models/listing");

const index = async (req, res) => {
  const { category, minPrice, maxPrice, sort, page = 1 } = req.query;
  const limit = 12; // Number of listings per page
  const skip = (page - 1) * limit;

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

  // Get total count for pagination
  const totalListings = await Listing.countDocuments(filter);
  const totalPages = Math.ceil(totalListings / limit);

  let query = Listing.find(filter).skip(skip).limit(limit).populate('reviews');
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
    currentPage: Number(page),
    totalPages,
    totalListings,
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
    return res.redirect("/listings");
  }
  // Fetch similar properties (same category, not this one)
  const similarListings = await Listing.find({
    category: post.category,
    _id: { $ne: post._id },
  }).limit(4);
  res.render("listings/show.ejs", { post, similarListings });
};

const postListing = async (req, res, next) => {
  // Handle features - convert comma-separated string to array
  let features = req.body.listing.features || '';
  if (typeof features === 'string') {
    features = features.split(',').map(f => f.trim()).filter(f => f.length > 0);
  } else if (!Array.isArray(features)) {
    features = [features];
  }

  const images = req.files && req.files.length > 0 ? req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  })) : [];

  if (images.length === 0) {
    req.flash("error", "Please upload at least one image");
    return res.redirect("/listings/new");
  }

  const newListing = new Listing({
    ...req.body.listing,
    features,
    owner: req.user._id,
    images: images,
  });
  await newListing.save();
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

const editListing = async (req, res) => {
  const { id } = req.params;
  const curntListing = await Listing.findById(id);
  if (!curntListing) {
    req.flash("error", "Requested listing does not exist");
    return res.redirect("/listings");
  }

  const orgImages = curntListing.images.map((img) => {
    let url = img.url.replace("/upload", "/upload/w_250");
    return { ...img, url };
  });

  res.render("listings/edit.ejs", { curntListing, orgImages });
};

const updateListing = async (req, res) => {
  const { id } = req.params;

  // Handle features - convert comma-separated string to array
  let features = req.body.listing.features || '';
  if (typeof features === 'string') {
    features = features.split(',').map(f => f.trim()).filter(f => f.length > 0);
  } else if (!Array.isArray(features)) {
    features = [features];
  }

  const updatedData = {
    ...req.body.listing,
    features,
  };

  const listing = await Listing.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  if (req.files && req.files.length > 0) {
    const newImages = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));
    listing.images.push(...newImages);
    await listing.save();
  }

  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${id}`);
};

const deleteListing = async (req, res) => {
  const { id } = req.params;
  
  // Check if listing exists and user is owner
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  
  // Delete the listing (cascade delete will handle reviews and bookings)
  await Listing.findByIdAndDelete(id);
  
  req.flash("success", "Listing and all associated bookings deleted successfully!");
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
