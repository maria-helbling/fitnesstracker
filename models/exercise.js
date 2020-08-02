const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: false,
    required: "Exercise must have a name"
  },
  type: {
    type: String,
    trim:true,
    enum: ['cardio', 'strength']
  },
  weight: Number,
  sets: Number,
  reps: {
    type: Number,
  min: [1, 'Must do at least one rep']},
  duration: Number,
  distance: Number
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;