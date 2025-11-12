const formData = require("../models/forms.model.js");
const blogData = require("../models/blogs.model.js");
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
const getSingleBlog = async (req, res) => {
  try {
    const blogid = req.params.id;
    
  } catch (err) {
    res.send({
      status: 500,
      message: "server Code is Failed",
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
const updateBlog = async (req, res) => {
  try {
    const blogid = req.params.id;
    const updateblog = await blogData.findByIdAndUpdate(blogid, req.body, {
      new: true,
    });
    if (!updateblog) {
      return res.send({
        status: 404,
        message: "Blog not Found",
      });
    }
    return res.send({
      status: 200,
      message: "Blog updated",
    });
  } catch (err) {
    res.send({
      status: 500,
      error: err.message,
      message: "Error",
    });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const blogid = req.params.id;
    const blogdelete = await blogData.findByIdAndDelete(blogid);
    if (!blogdelete) {
      res.send({
        status: 404,
        message: "Blog not Found",
      });
    }
    return res.send({
      status: 200,
      message: "Blog deleted",
    });
  } catch (err) {
    res.send({
      status: 500,
      error: err.message,
      message: "Error",
    });
  }
};
module.exports = {
  userDetails,
  blog,
  blogGet,
  updateBlog,
  deleteBlog,
};
