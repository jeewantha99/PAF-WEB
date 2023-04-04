const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
require("dotenv").config({ path: "./config.env" });
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoute");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const mongoose = require("mongoose");

//build database connection
const connectDB = require("./DB/db");
dotenv.config();
connectDB();


//getting port number
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running");
});

//server starting to listning
const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);
if (server) {
  console.log("Success".green.bold);
}


app.use("/api/user",userRoutes);
app.use("/api/post", postRoutes);

app.use(errorHandler);
app.use(notFound);
