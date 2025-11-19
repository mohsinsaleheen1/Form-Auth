const express = require("express");
const router = express.Router();
const {
  userDetails,
  blog,
  blogGet,
  deleteBlog,
  updateBlog,
  singleBlog,
} = require("../controller/controller.js");
router.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Token verified",
    user: req.user,
  });
});
router.get("/userDetails", userDetails);
// Only user can access this route
router.post("/blog", blog);
router.get("/blogGet", blogGet);
router.delete("/deleteblog/:id", deleteBlog);
router.put("/updateblog/:id", updateBlog);
router.get("/getSingleBlog/:id", singleBlog);
module.exports = router;
