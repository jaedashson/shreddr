require('dotenv').config();
const path = require('path');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./confg/keys").mongoURI;
const users = require("./routes/api/users");
const User = require("./models/User");
const bodyParser = require("body-parser");
const exercises = require('./routes/api/exercises');
const workouts = require('./routes/api/workouts');
const bodyweights = require('./routes/api/bodyweights');
const cors = require("cors");
// route

// passport?

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

// Is the correct way to deploy to Heroku?
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
});

app.use("/api/users", users);
app.use("/api/exercises", exercises);
app.use("/api/workouts", workouts);
app.use("/api/bodyweights", bodyweights);

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Listening on port ${port}`)});