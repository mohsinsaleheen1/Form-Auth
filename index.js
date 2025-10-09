const express = require("express");
const formRouter = require("./routes/form.routes.js");
const { connectDB } = require("./config/database.js");
const path = require("path");
const app = express();
const PORT = 3000;
const cors = require("cors");
// Middlewere
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
// DataBase Connection
connectDB();
// Routes
app.use("/", formRouter);
app.listen(PORT, () => {
  console.log(`Server is runing at http://localhost:${PORT}`);
});
