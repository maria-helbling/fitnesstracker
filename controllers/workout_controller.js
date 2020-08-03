const express = require("express");
const router = express.Router();
const db = require("../models");

//get route to get current workout
router.get('/api/:workout', (req, res)=>{
    db.Workout.find({_id:req.params.workout})
    .populate("exercises")
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(({message}) => {
    console.log(message);
    res.status(500).end();
  })
})

//post new exercise
router.post('/api/workout', (req, res)=>{
    db.Workout.create({ name: req.body.name })
  .then(dbWorkout => {
    res.json(dbWorkout)
  })
  .catch(({message}) => {
    res.status(500).end();
  });
})


// Export routes for server.js to use.
module.exports = router;