const express = require("express");
const router = express.Router();
const {
  userDetails,
  blog,
  blogGet,
  deleteBlog,
  updateBlog,
} = require("../controller/controller.js");
router.post("/blog", blog);
router.get("/blogGet", blogGet);
router.get("/userDetails", userDetails);
router.delete("/deleteblog/:id", deleteBlog);
router.put("/updateblog/:id", updateBlog);
module.exports = router;

