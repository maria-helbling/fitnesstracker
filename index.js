const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");


const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// configure handlebars as the view engine

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnesstracker", { useNewUrlParser: true });

const handlebarRoute = require("./controllers/handlebar_controller.js");
const workoutRoute = require("./controllers/workout_controller.js");
const exerciseRoute = require("./controllers/exercise_controller.js");
app.use(handlebarRoute);
app.use(workoutRoute);
app.use(exerciseRoute);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });