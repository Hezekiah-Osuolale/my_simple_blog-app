const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const upload = require("../config/multer");
const { ensureAuthenticated } = require("../middleware/auth");

// INDEX
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render("index", { blogs });
  } catch (err) {
    req.flash("error_msg", "Could not fetch blogs");
    res.redirect("/");
  }
});

// NEW
router.get("/new", ensureAuthenticated, (req, res) => {
  res.render("new");
});

// CREATE
router.post(
  "/",
  ensureAuthenticated,
  upload.single("image"),
  async (req, res) => {
    try {
      const newBlog = new Blog({
        title: req.body.title,
        body: req.body.body,
        image: req.file ? req.file.filename : null,
        author: req.user._id,
      });
      await newBlog.save();
      req.flash("success_msg", "Blog created with image ✅");
      res.redirect("/blogs");
    } catch (err) {
      console.error(err);
      req.flash("error_msg", "Error creating blog ❌");
      res.redirect("/blogs/new");
    }
  }
);

// SHOW
router.get("/:id", ensureAuthenticated, async (req, res) => {
  try {
    // const blog = await Blog.findById(req.params.id);
    const blog = await Blog.findById(req.params.id).populate("author");
    console.log(blog);

    if (!blog) {
      req.flash("error_msg", "Blog not found ❌");
      return res.redirect("/blogs");
    }
    res.render("show", { blog });
  } catch (err) {
    req.flash("error_msg", "Error loading blog ❌");
    res.redirect("/blogs");
  }
});

// EDIT
router.get("/:id/edit", ensureAuthenticated, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render("edit", { blog });
  } catch (err) {
    req.flash("error_msg", "Error loading edit page ❌");
    res.redirect("/blogs");
  }
});

// UPDATE
router.put("/:id", ensureAuthenticated, async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body.blog);
    req.flash("success_msg", "Blog updated successfully ✏️");
    res.redirect(`/blogs/${req.params.id}`);
  } catch (err) {
    req.flash("error_msg", "Error updating blog ❌");
    res.redirect("/blogs");
  }
});

// DELETE
router.delete("/:id", ensureAuthenticated, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Blog deleted successfully 🗑️");
    res.redirect("/blogs");
  } catch (err) {
    req.flash("error_msg", "Error deleting blog ❌");
    res.redirect("/blogs");
  }
});

module.exports = router; // ✅ must export router
