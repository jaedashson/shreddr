const express = require('express');
const router = express.Router();
const Exercise = require('../../models/Exercise');


router.get("/test", (req, res) => {
    res.json({ msg: 'testing exercise route'})
})

router.get("/", (req, res) => {
    Exercise
        .find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json(err))
})

router.post("/",

    (req, res) => {
        // Validate exercise
        // (If not valid)
        debugger

        // If exercise is valid...
        const newExercise = new Exercise({
            name: req.body.name,
            equipment: req.body.equipment,
            difficulty: req.body.difficulty,
            category: req.body.category,
            muscleGroups: req.body.muscleGroups,
            description: req.body.description
        });

        newExercise
            .save()
            .then(exercise => res.json(exercise));
    }
)

module.exports = router;