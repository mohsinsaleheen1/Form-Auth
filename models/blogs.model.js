const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  blog_title: {
    type: String,
  },
  blog_content: {
    type: String,
  },
  blog_date: {
    type: Date,
  },
});
const blogData = mongoose.model("blogData", formSchema);
module.exports = blogData