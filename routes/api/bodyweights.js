const express = require('express');
const router = express.Router();
const Bodyweight = require('../../models/Bodyweight');
const passport = require('passport');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// // POST /api/bodyweights/users/:user_id/bodyweight
// router.post(
//     "/users/:user_id/bodyweight",
//     passport.authenticate("jwt", { session: false }),
//     (req, res) => {
//         // validations, if any

//         const dateArray = req.body.date.split("-");
//         const year = parseInt(dateArray[0]);
//         const month = parseInt(dateArray[1]);
//         const date = parseInt(dateArray[2]);

//         const newBodyweight = new Bodyweight({
//             user: req.user.id,
//             weight: req.body.weight,
//             date: new Date(year, month, date)
//         })

//         newBodyweight.save().then(bodyweight => res.json(bodyweight));
//     }
// )


// Route WITHOUT passport/jwt stuff
// POST /api/bodyweights/:user_id
router.post("/:user_id", (req, res) => {
    const dateArray = req.body.date.split("-");
    const year = parseInt(dateArray[0]);
    const month = parseInt(dateArray[1]) - 1;
    const date = parseInt(dateArray[2]);
    const bodyweightDate = new Date(year, month, date);

    Bodyweight.deleteMany({
        user: req.params.user_id,
        date: bodyweightDate
    }).then(() => {
        const newBodyweight = new Bodyweight({
            user: req.params.user_id,
            weight: req.body.weight,
            date: bodyweightDate
        });

        newBodyweight.save().then(bodyweight => {
            return res.json(bodyweight);
        });
    })
})

// GET /api/bodyweights/:user_id
router.get("/:user_id", (req, res) => {
    Bodyweight.find({ user: req.params.user_id })
        .sort({ date: -1 })
        .then(bodyweights => res.json(bodyweights))
        .catch(err => res.status(404).json({ noBodyweightsFound: "No bodyweights found from that user"}))
})

module.exports = router;