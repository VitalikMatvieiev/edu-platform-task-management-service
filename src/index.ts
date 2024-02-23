const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/tasksModel");
const taskRoute = require("./router/tasksRouter");
const app = express();

require("dotenv").config();

const mongoString = process.env.MONGODB_URI;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/tasks", taskRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

mongoose
  .connect(mongoString)
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

module.exports = {
  app,
};
