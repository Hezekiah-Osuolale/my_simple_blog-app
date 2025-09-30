const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");
const { ensureAuthenticated } = require("../middleware/auth");

router.get("/", ensureAuthenticated, async (req, res) => {
  const blogs = await Blog.find();
  res.render("blogs/index", { blogs });
});

// Register form
router.get("/register", (req, res) => res.render("auth/register"));

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2)
    errors.push({ msg: "Please fill in all fields" });
  if (password !== password2) errors.push({ msg: "Passwords do not match" });
  if (password.length < 6)
    errors.push({ msg: "Password must be at least 6 characters" });

  if (errors.length > 0) {
    res.render("auth/register", { errors, name, email });
  } else {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error_msg", "Email is already registered");
      return res.redirect("/auth/register");
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash });
    req.flash("success_msg", "You are now registered and can log in");
    res.redirect("/auth/login");
  }
});

// Login form
router.get("/login", (req, res) => res.render("auth/login"));

// Login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "You are logged out");
    res.redirect("/auth/login");
  });
});

module.exports = router;
