require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../../models/User");
// const Bodyweight = require("../../models/Bodyweight")
const bcrypt = require("bcryptjs");
const keys = require('../../frontend/src/confg/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateLoginInput = require('../../validations/login');
const validateRegisterInput = require('../../validations/register');
const multer = require("multer"); // AWS
var AWS = require("aws-sdk"); // AWS

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

//test route
router.get("/test", (req, res) => {
  res.json({ msg: "This is the user route" });
});

//get current user route
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(req.user)
  }
)

//user registration route
// Lots of boilerplate
router.post("/register", (req, res) => {
  debugger
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      return res.status(400).json({email: "A user is already registered with that email"});
    } else { // Change to .catch
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

      // Hash and salt the password (boilerplate)
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user)) // Send json response (request complete)
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
  
  // const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: req.body.email })
    .then(user => {

      // Is this unnecessary?
      if (!user) {
        //console.log(user)
        return res.status(404).json({ login_email: "This dude does not exist." });
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

            // Signs user in
            jwt.sign(
              payload,
              keys.secretOrKey, // 
              { expiresIn: 3600 },
              (err, token) => {
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
      } else {
        return res.json(user); // do i need to specifiy 200 code for success call?
      }
    })
})

router.post("/:user_id/profilePic", upload.single("file"), (req, res) => {
  User.findOne({ _id: req.params.user_id })
    .then(user => {
      if (!user) {
        return res.status(404).json({ user: 'This user does not exist!' })
      } else {
        // debugger
        const file = req.file;
        const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

        let s3bucket = new AWS.S3({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_REGION
        });

        var params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: file.originalname,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: "public-read"
        };

        s3bucket.upload(params, (err, data) => {
          if (err) {
            res.status(500).json({ error: true, Message: error });
          } else {
            user.fileLink = s3FileURL + "/" + file.originalname;
            user.s3_key = params.Key;
            // debugger
            user.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          }
        })

      }
    })
})

module.exports = router; 

// Pushing from Jae-Son's computer