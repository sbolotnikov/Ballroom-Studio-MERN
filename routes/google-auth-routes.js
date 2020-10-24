const db = require("../models");
const passport = require("../config/passport");
module.exports = function (app) {
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        }));

    app.get('/auth/google/redirect',
        passport.authenticate('google', {
            failureRedirect: '/google_registered'
        }),
        function (req, res) {
            res.redirect('/members');
        });
}