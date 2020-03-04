const passport = require("passport");
const User = require("../models/User");
require("../models/Journey");

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession)
    .populate("favorites")
    .then(userDocument => {
      cb(null, userDocument);
    })
    .catch(err => {
      cb(err);
    });
});
