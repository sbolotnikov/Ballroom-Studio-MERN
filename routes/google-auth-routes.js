const db = require("../models");
const passport = require("../config/passport");
require('dotenv').config();
var cors = require('cors')

module.exports = function (app) {

    app.get('/api/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        }));

    app.get('/api/auth/google/redirect',
        passport.authenticate('google', {
            failureRedirect: '/'
        }),
        function (req, res) {
            process.env.NODE_ENV === "production" ?
                res.redirect('https://mern-ballroom.onrender.com/#/member') :
                res.redirect('http://localhost:3000/#/member');
        });

    // app.get('/auth/facebook', passport.authenticate('facebook'));

    // app.get('/auth/facebook/callback',
    //     passport.authenticate('facebook'),
    //     function (req, res) {
    //         process.env.NODE_ENV === "production" ?
    //             res.redirect('/#/member') :
    //             res.redirect('http://localhost:3000/#/member');
    //     });
}