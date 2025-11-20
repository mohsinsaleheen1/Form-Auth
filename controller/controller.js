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
      userId: req.user.id,
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
const singleBlog = async (req, res) => {
  try {
    const blogid = req.params.id;
    const singleBlog = await blogData.findById({
      _id: blogid,
      userId: req.user.id,
    });
    res.status(200).json({ singleBlog });
    if (!singleBlog) {
      res.send({
        status: 404,
        message: "Blog Not Found",
      });
    }
  } catch (err) {
    res.send({
      status: 500,
      message: "server Code is Failed",
      err: err.message,
    });
  }
};
const blogGet = async (req, res) => {
  try {
    console.log(req.user.id);
    const users = await blogData.find({ userId: req.user.id });
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
    const updateblog = await blogData.findByIdAndUpdate(
      { _id: blogid, userId: req.user.id },
      req.body,
      {
        new: true,
      }
    );
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
    const blogdelete = await blogData.findByIdAndDelete({
      _id: blogid,
      userId: req.user.id,
    });
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
  singleBlog,
};
