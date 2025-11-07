const mongoose = require("mongoose");
const formSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  // role: {
  //   type: String,
  //   enum: ["admin", "user"],
  //   required: true,
  // },
});
const formData = mongoose.model("formData", formSchema);
module.exports = formData;
