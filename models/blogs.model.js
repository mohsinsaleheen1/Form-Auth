const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  blog_title: {
    type: String,
  },
  blog_author: {
    type: String,
  },
  blog_content: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  blog_date: {
    type: Date,
    default: Date.now,
  },
});
const blogData = mongoose.model("blogData", blogSchema);
module.exports = blogData;
