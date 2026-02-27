const express = require("express");
const mongoose = require("mongoose");
let noteRoutes = require("./routes/route")
const cors = require("cors");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/notesApp")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

  app.use(cors());
app.use(express.json());

app.use("/api",noteRoutes)

app.listen(5000, () => {
  console.log("Server running on port 5000");
});