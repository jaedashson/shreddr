const express = require('express');
const router = express.Router();
const Workout = require('../../models/Workout');
const Exercise = require('../../models/Exercise');

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

    // debugger

    // const newExercises = Exercise.find({
    //     // equipment: { $in: availEquip }, // exclude all exercises that require a piece of equipment that is not in availEquip
    //     // difficulty: { $in: difficultyLevel },
    //     muscleGroups: { $in: muscles } 
    // }).then(ex => res.json(ex)).catch(err => res.json(err))
    // Exercise.find().then(ex => res.json(ex));
    // Exercise.find( { muscleGroups : { $all: muscles }}).then( ex => res.json(ex))

    // WHAT WE'VE TRIED SO FAR
    // Exercise.find().then(ex => res.json(ex)); // Gets all of the exercises

    // Exercise.find().where({ muscleGroups: { $in : muscles } }).then( ex => res.json(ex)); // Gets empty array

    // Exercise.find({
    //     muscleGroups: req.body.muscleGroups
    // }).then(ex => res.json(ex)).catch(err => res.json(err)); // Gets exact muscleGroup matches

    Exercise.find({
        muscleGroups: { $elemMatch: req.body.muscleGroups  }
    }).then(ex => res.json(ex)).catch(err => res.json(err));



    //   .where({ muscleGroups: { $in: muscles } })
    //   .then((ex) => res.json(ex));
    // const query = Exercise.find();
    // query.where(() => {return Exercise.equipment.includes(req.body.equipment)})
});

module.exports = router;

