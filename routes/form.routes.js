const express = require("express");
const router = express.Router();
const { signup, login, userDetails } = require("../controller/controller.js");
router.post("/signup", signup);
router.post("/login", login);
router.get("/userDetails", userDetails);
module.exports = router;
