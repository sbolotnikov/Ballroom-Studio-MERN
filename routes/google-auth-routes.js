const db = require("../models");
const passport = require("../config/passport");
require('dotenv').config();
var cors = require('cors')

module.exports = function (app) {

    app.use(cors()); 
// var whitelist = ['http://localhost:3000/', 'https://mern-ballroom.herokuapp.com/','http://localhost:8080/']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
console.log(process.env.GOOGLE_CLIENT_ID);
      console.log(process.env.GOOGLE_CLIENT_SECRET);
    app.get('/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        }));

    app.get('/auth/google/redirect',
        passport.authenticate('google'),
        function (req, res) {
            res.json({'members':true});
        });
}