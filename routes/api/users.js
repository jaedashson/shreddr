const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Bodyweight = require("../../models/Bodyweight")
const bcrypt = require("bcryptjs");
const keys = require('../../confg/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateLoginInput = require('../../validations/login');
const validateRegisterInput = require('../../validations/register');

//test route

router.get("/test", (req, res) => {
  res.json({ msg: "This is the user route" });
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(req.user)
  }
)

//user registration route

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      return res.status(400).json({email: "A user is already registered with that email"});
    } else {
      const dateArray = req.body.dob.split("-");
      const year = parseInt(dateArray[0]);
      const month = parseInt(dateArray[1]);
      const date = parseInt(dateArray[2]);

      const newUser = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: req.body.password,
        dob: new Date(year, month, date),
        gender: req.body.gender,
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
}); 

//user login route

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: "This user does not exist." });
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              // handle: user.handle,
              email: user.email,
              fName: user.fName,
              lName: user.lName,
              dob: user.dob,
              date: user.date,
              bodyweights: user.bodyweights
            }
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                // debugger
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            ) 
          } else {
            return res.status(400).json({ password: "Incorrect password" });
          }
        })
    })
})

//user profile route
// GET /api/users/profile/fj3285u320fjdskoaf
router.get("/profile/:user_id", (req, res) => {
  User.findOne({ _id: req.params.user_id })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: 'This user does not exist!' })  
      }  else {
        return res.json(user); // do i need to specifiy 200 code for success call?
      }
    })
})

module.exports = router; 

// Pushing from Jae-Son's computer