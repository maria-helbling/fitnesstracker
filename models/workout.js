const mongoose = require("mongoose");
const moment = require('moment')

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: {
    type: String
  },
  day: { 
      type: Date, 
    unique:false},
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;