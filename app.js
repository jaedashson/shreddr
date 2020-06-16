const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./confg/keys").mongoURI;
const users = require("./routes/api/users");
const User = require("./models/User");
const bodyParser = require("body-parser");
const exercises = require('./routes/api/exercises');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());


app.get("/", (req, res) => {
  const user = new User({
    handle: "jim",
    email: "jim@jim.jim",
    password: "jimisgreat123"
  })
  user.save();
  res.send("Hello World!");
});

app.use("/api/users", users);
app.use("/api/exercises", exercises);

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Listening on port ${port}`)});