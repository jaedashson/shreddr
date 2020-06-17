const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const keys = require('../../confg/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateLoginInput = require('../../validations/login');
const validateRegisterInput = require('../../validations/register');

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

//push test

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  // const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ login_email: "This dude does not exist." });
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              // handle: user.handle,
              email: user.email
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

module.exports = router; 

// Pushing from Jae-Son's computer