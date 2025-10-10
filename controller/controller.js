const formData = require("../models/forms.model.js");
const blogData = require("../models/blogs.model.js");
const hashy = require("hashy");
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
    hashy.verify(password, user.password, function (error, success) {
      if (error) {
        return console.error(err);
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
    });
  } catch (err) {
    res.send({
      message: "user not found",
      err,
      status: 404,
    });
  }
};
const userDetails = async (req, res) => {
  try {
    const users = await formData.find();
    console.log(users, "line no 64");
    res.send({
      message: "Users Recieved",
      users,
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: 500,
      message: "server Code is Failed",
      err,
    });
  }
};
const blog = async (req, res) => {
  try {
    const { blog_title, blog_author, blog_content } = req.body;
    const newBlog = new blogData({
      blog_title,
      blog_author,
      blog_content,
    });
    newBlog.save();
    res.send({
      status: 200,
      newBlog,
      message: "Blog has been posted",
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Server error",
      err,
    });
  }
};
const blogGet = async (req, res) => {
  try {
    const users = await blogData.find();
    console.log(users, "line no 64");
    res.send({
      message: "Users Recieved",
      users,
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: 500,
      message: "server Code is Failed",
      err,
    });
  }
};
module.exports = { signup, login, userDetails, blog, blogGet };
