const express = require("express");
const router = express.Router();
const db = require("../models");

//get route to get all exercises


//get route to get all exercises from given workout

//post new exercise relative to particular workout
router.post('/api/exercise/:workoutid', (req, res)=>{
    db.Exercise.create(req.body)
    .then(data => {
        
        return db.Workout.findOneAndUpdate({_id:req.params.workoutid}, {$push: {exercises:data._id}})
    })
    .then(data => {
        console.log(data)
        res.json(data)
    })
    .catch(err=>
        res.status(500).end())
})



// Export routes for server.js to use.
module.exports = router;