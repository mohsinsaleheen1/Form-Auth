const express = require("express");
const formRouter = require("./routes/form.routes.js");
const blogroute = require("./routes/blogs.routes.js");
const authentication = require("./middleware/authentication.js");
const { connectDB } = require("./config/database.js");
const path = require("path");
const app = express();
const PORT = 3000;
// Middlewere
const cors = require("cors");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
// DataBase Connection
connectDB();
// Routes
app.use("/api/form", formRouter);
app.use("/api/blog", authentication, blogroute);
// app.use("/api/admin", blogroute);
app.listen(PORT, () => {
  console.log(`Server is runing at http://localhost:${PORT}`);
});
