const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgressPicSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    required: true
  },
  fileLink: {
    type: String
  },
  s3_key: {
    type: String
  }
});

const ProgressPic = mongoose.model("progressPics", ProgressPicSchema);
module.exports = ProgressPic;