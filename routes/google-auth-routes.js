const db = require("../models");
const passport = require("../config/passport");
require('dotenv').config();
var cors = require('cors')

module.exports = function (app) {

    app.get('/_auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        }));

    app.get('/_auth/google/redirect',
        passport.authenticate('google'),
        function (req, res) {
            console.log("redirect user info")
            console.log( req.user)
            // res.json(req.user)
            res.redirect('http://localhost:3000/members');
        });
}