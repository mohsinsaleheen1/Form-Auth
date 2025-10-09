const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connected"))
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};
module.exports = { connectDB };
