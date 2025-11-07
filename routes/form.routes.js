const express = require("express");
const router = express.Router();

const {
  userDetails,
  blog,
  blogGet,
  deleteBlog,
  updateBlog,
} = require("../controller/controller.js");
const { signup, login, logout } = require("../controller/auth.js");
router.post("/signup", signup);
router.post("/logout", logout);
router.post("/login", login);
router.post("/blog", blog);
router.get("/blogGet", blogGet);
router.get("/userDetails", userDetails);
router.delete("/deleteblog/:id", deleteBlog);
router.put("/updateblog/:id", updateBlog);
module.exports = router;
