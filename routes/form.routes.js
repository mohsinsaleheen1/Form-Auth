import express from "express";
const router = express.Router();
import {
  signup,
  login,
  signupage,
  loginPage,
} from "../controller/controller.js";
router.get("/signupPage", signupage);
router.post("/signup", signup);
router.get("/loginPage", loginPage);
router.post("/login", login);
export default router;
