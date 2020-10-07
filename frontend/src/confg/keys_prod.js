// keys_prod.js
module.exports = {
  mongoURI: process.env.MONGO_URI, // accesses db
  secretOrKey: process.env.SECRET_OR_KEY,
  REACT_APP_GOOGLE_KEY: process.env.REACT_APP_GOOGLE_KEY // same but for googleAPI
}