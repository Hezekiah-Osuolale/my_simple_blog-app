# 📝 Blog Website (Node.js + MongoDB + EJS)

A simple **blog application** built with Node.js, Express, MongoDB, and EJS.
Users can create, view, edit, and delete blog posts. Supports **image uploads**, **Bootstrap styling**, and **flash messages** for user feedback.

---

## 🚀 Features

- **Blog CRUD**

  - Create, read, update, and delete blog posts.

- **Image Uploads**

  - Upload images from your computer using Multer.
  - Images are stored in `/uploads` folder.

- **Flash Messages**

  - Success and error messages using `connect-flash` and `express-session`.
  - Messages auto-dismiss after a few seconds.

- **Styling**

  - Fully styled with **Bootstrap 5**.
  - Responsive layout.

- **User Experience**

  - Clean form validation with alerts.
  - Auto-clearing flash messages.

- **Code Structure**

  - MVC-style structure (models, routes, views).
  - EJS templates with layouts.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Frontend:** EJS, Bootstrap 5, Custom CSS
- **File Uploads:** Multer
- **Flash Messages:** connect-flash

---

## 📂 Project Structure

```
project/
│── app.js
│── package.json
│── .gitignore
│── uploads/          # uploaded images (ignored in git)
│── config/
│   └── multer.js     # multer config
│── models/
│   └── Blog.js       # mongoose schema
│── routes/
│   └── blogRoutes.js # all blog routes
│── views/
│   ├── layouts/
│   │   └── main.ejs  # layout with navbar & flash
│   ├── index.ejs     # list blogs
│   ├── new.ejs       # create form
│   ├── edit.ejs      # edit form
│   └── show.ejs      # single blog
```

---

## ⚡ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/<USERNAME>/<REPO>.git
cd <REPO>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup MongoDB

- Make sure you have MongoDB running locally **or** use MongoDB Atlas.
- Add your connection string in `app.js` or a `.env` file.

### 4. Run the Server

```bash
npm start
```

Visit: `http://localhost:3000`

---

## ✨ Example Usage

- Go to `/blogs` → see all posts.
- Click **New Blog** → create a post with image.
- View a blog → `/blogs/:id`.
- Edit or delete blogs with buttons.

---

## 📸 Screenshots

(Add screenshots of homepage, new blog form, and blog post view)

---

## 📜 License

This project is licensed under the MIT License.
