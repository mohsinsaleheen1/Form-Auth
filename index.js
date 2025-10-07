import express from "express";
import formRouter from "./routes/form.routes.js";
import { connectDB } from "./config/database.js";
const app = express();
const PORT = 3000;
// Middlewere
app.use(express.json());

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
// DataBase Connection
connectDB();
// Routes
app.use("/", formRouter);
app.listen(PORT, () => {
  console.log(`Server is runing at http://localhost:${PORT}`);
});
