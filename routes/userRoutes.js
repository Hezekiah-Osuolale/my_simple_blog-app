const express = require("express");
const router = express.Router();
const User = require("../models/User");

// INDEX - list all users
router.get("/", async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.render("users/index", { users });
});

// NEW - show form
router.get("/new", (req, res) => {
  res.render("users/new");
});

// CREATE - add new user
router.post("/", async (req, res) => {
  try {
    await User.create(req.body.user);
    req.flash("success_msg", "User created ✅");
    res.redirect("/users");
  } catch (err) {
    req.flash("error_msg", "Error creating user ❌");
    res.redirect("/users/new");
  }
});

// SHOW - one user
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render("users/show", { user });
});

// EDIT - show edit form
router.get("/:id/edit", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render("users/edit", { user });
});

// UPDATE - update user
router.put("/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body.user);
    req.flash("success_msg", "User updated ✏️");
    res.redirect(`/users/${req.params.id}`);
  } catch (err) {
    req.flash("error_msg", "Error updating user ❌");
    res.redirect("/users");
  }
});

// DELETE - remove user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "User deleted 🗑️");
    res.redirect("/users");
  } catch (err) {
    req.flash("error_msg", "Error deleting user ❌");
    res.redirect("/users");
  }
});

module.exports = router;
