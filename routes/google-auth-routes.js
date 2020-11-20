const db = require("../models");
const passport = require("../config/passport");
require('dotenv').config();
var cors = require('cors')

module.exports = function (app) {

    app.get('/_auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        }));

    app.get('/auth/google/redirect',
        passport.authenticate('google', {
            failureRedirect: '/'
        }),
        function (req, res) {
            process.env.NODE_ENV === "production" ? 
                res.redirect('/member') :
                res.redirect('http://localhost:3000/#/member');
        });
}