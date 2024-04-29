require('dotenv').config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
const db = require("../models");
// Local Strategy
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

// Facebook Strategy
// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_CLIENT_ID,
//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//   callbackURL: "/auth/facebook/callback",
//   proxy: true
// },
//   (accessToken, refreshToken, profile, cb) => {
//     console.log(profile);
//     db.User.findOne({
//       email: profile.emails[0].value
//     }).then(dbUser => {
//       if (!dbUser) {
//         db.User.create({
//           firstName: profile.name.givenName,
//           lastName: profile.name.familyName,
//           email: profile.emails[0].value,
//           facebookId: profile.id,
//           profilePhotoUrl: profile.photos[0].value,
//           memberStatus: ["student"]
//         })
//           .then(result => {
//             db.User.findOne({
//               email: profile.emails[0].value
//             }).then(dbUser => {
//               return cb(null, dbUser);
//             })
//           })
//           .catch(err => {
//             console.log(err)
//           });

//       }
//       if (!dbUser.facebookId) {
//         db.User.findOneAndUpdate(
//           { "email": profile.emails[0].value },
//           { "facebookId": profile.id }
//         ).then(dbUser => { return cb(null, dbUser) })
//           .catch(err => {
//             console.log(err)
//           });
//       } else return cb(null, dbUser);
//     })
//   })
// );


// google strategy
passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/redirect",
    proxy: true
  },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      db.User.findOne({
        email: profile.emails[0].value
      }).then(dbUser => {
        if (!dbUser) {
          db.User.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            googleId: profile.id,
            profilePhotoUrl: profile.photos[0].value,
            memberStatus: ["student"]
          })
            .then(result => {
              db.User.findOne({
                email: profile.emails[0].value
              }).then(dbUser => {
                return done(null, dbUser);
              })
            })
            .catch(err => {
              console.log(err)
            });

        }
        if (!dbUser.googleId) {
          db.User.findOneAndUpdate(
            { "email": profile.emails[0].value },
            { "googleId": profile.id }
          ).then(dbUser => { return done(null, dbUser) })
            .catch(err => {
              console.log(err)
            });
        } else return done(null, dbUser);
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