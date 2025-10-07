import formData from "../models/forms.model.js";
import path from "path";
export const loginPage = (req, res) => {
  const fullPath =
    "C:\\Users\\T\\Desktop\\SMIT\\Backend\\loginSignup\\public\\login.html";
  res.sendFile(fullPath);
};
export const signupage = (req, res) => {
  const fullPath =
    "C:\\Users\\T\\Desktop\\SMIT\\Backend\\loginSignup\\public\\signup.html";
  res.sendFile(fullPath);
};
export const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, address, password } = req.body;
    console.log(first_name);

    const user = await formData.findOne({ email });
    if (user) {
      return res.send({
        status: 505,
        message: "user already exists",
      });
    }
    const newuser = new formData({
      first_name,
      last_name,
      email,
      password,
      phone,
      address,
    });
    newuser.save();
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
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await formData.findOne({ email });
    if (!user) {
      return res.send({
        status: 404,
        message: "User not found",
      });
    }
    if (password === user.password) {
      return res.send({
        status: 200,
        message: "User successfully logged in!",
      });
    } else {
      return res.send({
        status: 401,
        message: "Invalid password",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
