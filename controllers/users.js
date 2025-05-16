const User = require("../models/user.js");


const renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
}

const postUser = async (req, res, next) => {
    try {
      let { username, email, password } = req.body;

      const newUser = new User({ email, username });
      
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if(err) {
          return next(err);
        }
        req.flash("success", "Account created successfully!");
        res.redirect("/listings");
      })

    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
}

const renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
}


const login = async (req, res) => {
    req.flash("success", "Welcome back! You have successfully logged in.");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}


const logout = (req, res, next) => {
  req.logOut((err) => {
    if(err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  })
}

module.exports = { postUser, renderSignupForm, renderLoginForm, login, logout };