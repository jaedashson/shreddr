const express = require('express');
const router = express.Router();
const Workout = require('../../models/Workout');
const Exercise = require('../../models/Exercises');

router.post("/api/workouts/generate", (req, res) => {
    const difficulty = Exercise.find()
    
    const newWorkout = new Workout({

    })
})