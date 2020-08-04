const express = require("express");
const router = express.Router();
const db = require("../models");
const moment = require('moment')

router.get('/', (req, res)=>{
    db.Workout.find({})
    .sort({'day': -1})
    .limit(5)
    .lean()
    .then(data=>{
        console.log(data)
        data.map(element=>element.day = moment(element.day).format('MMMM Do YYYY'))
        res.render('index',{workout:data})
    })
    .catch(err=>{
        console.log(err)
        res.status(500)
    })

})

router.get('/stats', (req,res)=>{
    res.render('stats')
})

// Export routes for server.js to use.
module.exports = router;