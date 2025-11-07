const formData = require("../models/forms.model.js");
const hashy = require("hashy");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, address, password } = req.body;

    const user = await formData.findOne({ email });
    if (user) {
      return res.send({
        status: 505,
        message: "user already exists",
      });
    }
    hashy.hash(password, function (error, hash) {
      if (error) {
        return console.log(error);
      }
      const newuser = new formData({
        first_name,
        last_name,
        email,
        password: hash,
        phone,
        address,
      });
      newuser.save();
      console.log("generated hash: ", hash);
    });

    res.send({
      status: 200,
      newuser,
      message: "user has been created successfully",
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
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });
    hashy.verify(password, user.password, function (error, success) {
      if (error) {
        return console.error(error);
      }
      if (success) {
        console.log("you are now authenticated!");
        return res.send({
          status: 200,
          message: "user successfully login!!!",
        });
      } else {
        console.warn("invalid password!");
      }
      const token = jwt.sign(
        { userid: user._id, useremail: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );
      res.json({ token });
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Server error",
    });
  }
};
const logout = async (req, res) => {
  try {
    res.json({ message: "Logged out Successfully" });
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
  logout
};
