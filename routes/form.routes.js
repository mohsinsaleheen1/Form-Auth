const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controller/auth.js");
router.post("/signup", signup);
router.post("/logout", logout);
router.post("/login", login);
module.exports = router;