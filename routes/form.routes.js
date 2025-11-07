const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  userDetails,
  blog,
  blogGet,
  deleteBlog,
  updateBlog,
} = require("../controller/controller.js");
router.post("/signup", signup);
router.post("/login", login);
router.post("/blog", blog);
router.get("/blogGet", blogGet);
router.get("/userDetails", userDetails);
router.delete("/deleteblog/:id", deleteBlog);
router.put("/updateblog/:id", updateBlog);
module.exports = router;
