require("dotenv").config(); // Loads .env files

// MERN boilerplate
const path = require('path');
const express = require("express");
const app = express();
const mongoose = require("mongoose"); // Easier transition from relational to non-relation DB
const db = require("./frontend/src/confg/keys").mongoURI; // Specify database
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const User = require("./models/User");
const exercises = require('./routes/api/exercises');
// const workouts = require('./routes/api/workouts');
const bodyweights = require('./routes/api/bodyweights');
const progressPics = require('./routes/api/progressPics');
const cors = require("cors");

app.use(cors());

// passport?

// Connects to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

// Is the correct way to deploy to Heroku?
// MERN boilerplate code
// Executes when we run `npm start` in root directory
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build')); // build script in frontend/package.json
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

// Analogous to React routes in full stack App.jsx
app.use("/api/users", users);
app.use("/api/exercises", exercises);
// app.use("/api/workouts", workouts);
app.use("/api/bodyweights", bodyweights);
app.use("/api/progressPics", progressPics);

// Assigns port
const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Listening on port ${port}`)});