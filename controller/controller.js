const formData = require("../models/forms.model.js");
 const signup = async (req, res) => {
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
module.exports = {signup,login}