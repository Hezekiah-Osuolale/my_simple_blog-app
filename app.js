require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const blogRoutes = require("./routes/blogRoutes");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const { Console } = require("console");
const app = express();

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("database connected");
  })
  .catch((e) => {
    console.log(e);
  });

// Middlewares
app.set("view engine", "ejs");
app.use(expressLayouts); // enable layouts
app.set("layout", "layouts/main"); // default layout
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/uploads", express.static("uploads"));

// Sessions + Flash
app.use(
  session({
    secret: "blogSecretKey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

// Make flash messages available in all views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Routes
app.use("/blogs", blogRoutes);

// Root route
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// Server
app.listen(process.env.PORT, () => {
  console.log("Blog server is running");
});
