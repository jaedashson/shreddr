const express = require('express');
const router = express.Router();
const Workout = require('../../models/Workout');
const Exercise = require('../../models/Exercise');



// POST /api/workouts/generate
// params: muscleGroups, equipment, difficultyLevel
router.post("/generate", (req, res) => {
    const difficultyLevel = ["beginner", "intermediate", "advanced"];
    const availEquip = [
        "barbell",
        "barbell rack",
        "bench",
        "chair",
        "dumbbell"
    ];
    const muscles = [
        "tricep",
        "chest",
        "anterior deltoid"
    ]
    Object.freeze(difficultyLevel);

    // WHAT WE'VE TRIED SO FAR
    // Exercise.find().then(ex => res.json(ex)); 
    // Gets all of the exercises

    // Exercise.find().where({ muscleGroups: { $in : muscles } }).then( ex => res.json(ex)); 
    // Gets empty array

    // Exercise.find({
    //     muscleGroups: req.body.muscleGroups
    // }).then(ex => res.json(ex)).catch(err => res.json(err)); 
    // Gets exact muscleGroups ["chest", "tricep", "anterior deltoid"]

    // Exercise.find({
    //     muscleGroups: { $elemMatch: req.body.muscleGroups  }
    // }).then(ex => res.json(ex)).catch(err => res.json(err)); 
    // Returns error

    // Exercise.find({
    //     muscleGroups: { $in: req.body.muscleGroups }
    // }).then(ex => res.json(ex)).catch(err => res.json(err));
    // Gets exercises whose muscleGroups matches exactly ["bicep"]. Doesn't get pull-up
    // ["chest"] returns nothing because there aren't any exercises whose muscleGroups is ["chest"]

    // Exercise.find({ type: req.body.muscleGroups }).ne
    Exercise.find({ muscleGroups: req.body.muscleGroups }).then(ex => res.json(ex)).catch(err => res.json(err));
});

module.exports = router;

