const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  userDetails,
  blog,
  blogGet,
} = require("../controller/controller.js");
router.post("/signup", signup);
router.post("/login", login);
router.post("/blog", blog);
router.get("/blogGet",blogGet)
router.get("/userDetails", userDetails);
module.exports = router;
