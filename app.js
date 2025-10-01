require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const blogRoutes = require("./routes/blogRoutes");
const expressLayouts = require("express-ejs-layouts");
const userRoutes = require("./routes/userRoutes");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const initializePassport = require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const Blog = require("./models/Blog");

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

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

initializePassport(passport);
// Middlewares
app.set("view engine", "ejs");
app.use(expressLayouts); // enable layouts
app.set("layout", "layouts/main"); // default layout
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/uploads", express.static("uploads"));

app.use(
  session({
    secret: "blogSecretKey",
    resave: false,
    saveUninitialized: false,
  })
  // Sessions + Flash
);

// passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Make flash messages available in all views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error"); // passport sets this
  next();
});

// Routes
app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// Root route
app.get("/", async (req, res) => {
  try {
    // Show latest 3 blogs on landing page
    const blogs = await Blog.find()
      .populate("author")
      .sort({ createdAt: -1 })
      .limit(3);
    res.render("landing", { blogs });
  } catch (err) {
    req.flash("error_msg", "Could not load blogs");
    res.render("landing", { blogs: [] });
  }
});

// Server
app.listen(process.env.PORT, () => {
  console.log("Blog server is running");
});
