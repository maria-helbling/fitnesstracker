const express = require("express");
const router = express.Router();
const db = require("../models");

//get route to get current workout


//post new exercise
router.post('/api/workout', (req, res)=>{
    db.Workout.create({ name: "Today's Workout" })
  .then(dbLibrary => {
    console.log(dbLibrary);
    res.json(dbLibrary)
  })
  .catch(({message}) => {
    console.log(message);
    res.status(500).end();
  });
})


// Export routes for server.js to use.
module.exports = router;