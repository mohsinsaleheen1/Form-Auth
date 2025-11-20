const formData = require("../models/forms.model.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookie = require("cookie-parser");
dotenv.config();
const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, address, password, role } =
      req.body;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const newuser = {
          first_name,
          last_name,
          email,
          password: hash,
          phone,
          address,
          role,
        };
        const result = new formData(newuser).save();
        return res.send({
          status: 200,
          result,
          message: "user has been created successfully",
        });
      });
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Server error",
      err,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await formData.findOne({ email });
    if (!user) {
      return res.send({
        status: 404,
        message: "User not found",
      });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (!result) {
        return res.send({
          status: 401,
          message: "Invalid email or password",
        });
      }
      const token = jwt.sign(
        { id: user._id, useremail: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      console.log("token", token);
      res.cookie("jwtToken", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      return res.send({
        status: 200,
        message: "user login successfully",
        token,
        role: user.role,
      });
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Server error",
      err,
    });
  }
};
const logout = async (req, res) => {
  try {
    res.json({ message: "Logged out successfully!" });
  } catch (err) {
    res.send({
      status: 500,
      message: "Server error",
    });
  }
};
module.exports = {
  signup,
  login,
  logout,
};
