if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const app = express();
const port = process.env.PORT || 8080;
const dbUrl = process.env.ATLASDB_URL;
const ExpressError = require("./utils/expressError.js");

//Authentication, cookies and session:
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

//Router:
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const searchRouter = require("./routes/search.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

main()
  .then(() => {
    console.log("Connected to Database Successfully ✅");
  })
  .catch((err) => {
    console.log("Error connecting to database: ", err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

//Session Options & Cookies Management & Authentication
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Error in MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

//Session Options
app.use(session(sessionOptions));
app.use(flash());

//Authentication Strategy:
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Flash Messages and currUser
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user || null; // Always define currUser
  next();
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});

// ------------------ API Connections-----------------------

// Routes:
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/search", searchRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

//Error Handlers;
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Error!" } = err;
  // Ensure currUser and flash messages are always defined for error pages
  if (!res.locals.currUser) {
    res.locals.currUser = null;
  }
  if (!res.locals.success) {
    res.locals.success = req.flash("success");
  }
  if (!res.locals.error) {
    res.locals.error = req.flash("error");
  }
  res.status(statusCode).render("error.ejs", { message });
});

//Listening Port:
app.listen(port, () => {
  console.log("App Listening On Port : ", port);
});
