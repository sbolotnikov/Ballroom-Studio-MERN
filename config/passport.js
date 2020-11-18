require('dotenv').config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const db = require("../models");

passport.use(
  new LocalStrategy({
      usernameField: "email",
    },
    function (email, password, done) {
      db.User.findOne({
        email: email
      }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "Incorrect handle."
          });
        }
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: "Incorect password."
          });
        }
        return done(null, user);
      }).select("+password");
    }
  ),
);

passport.use(
  new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect"    
    },
    function (accessToken, refreshToken, profile, done) {
      db.User.findOne({
        googleId: profile.id
      }).then(dbUser => {
        if (!dbUser) {
          db.User.create({
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: profile.emails[0].value,
              googleId: profile.id,
              profilePhotoUrl: profile.photos[0].value
            })
            .catch(err => {
              res.status(400).json(err);
            });
        }
        return done(null, dbUser);
      })
    })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;