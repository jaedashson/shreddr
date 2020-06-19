require("dotenv").config();
const express = require('express');
const router = express.Router();
const ProgressPic = require('../../models/ProgressPic');
const passport = require('passport');
const multer = require("multer"); // AWS
var AWS = require("aws-sdk"); // AWS

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.get("/test", (req, res) => {
  res.json({ msg: "This is the progressPics route yo" });
});


// POST /api/progressPics/:user_id
router.post("/:user_id", upload.single("file"), (req, res) => {
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
      const dateArray = req.body.date.split("-");
      const year = parseInt(dateArray[0]);
      const month = parseInt(dateArray[1]) - 1;
      const date = parseInt(dateArray[2]);

      // debugger
      // invalid date
      const newProgressPic = new ProgressPic({
        user: req.params.user_id,
        date: new Date(year, month, date),
        fileLink: s3FileURL + "/" + file.originalname,
        s3_key: params.Key
      });

      newProgressPic.save()
        .then(progressPic => res.json(progressPic))
        .catch(err => console.log(err));
    }
  })
})

// GET /api/progressPics/:user_id
router.get("/:user_id", (req, res) => {
  ProgressPic.find({ user: req.params.user_id })
    .sort({ date: -1 })
    .then(progressPics => res.json(progressPics))
    .catch(err => res.status(404).json({ noProgressPicsFound: "No progress pics found from that user"}))
})


module.exports = router;