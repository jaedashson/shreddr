const express = require('express');
const router = express.Router();
const Bodyweight = require('../../models/Bodyweight');
const passport = require('passport')

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
    const month = parseInt(dateArray[1]);
    const date = parseInt(dateArray[2]);

    const newBodyweight = new Bodyweight({
        user: req.params.user_id,
        weight: req.body.weight,
        date: new Date(year, month, date)
    })

    newBodyweight.save().then(bodyweight => res.json(bodyweight));
})

module.exports = router;