// Requiring our models and passport as we've configured it
const db = require("../models");
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;
module.exports = function (app) {

    app.get("/api/members/:id", (req, res) => {
        if (!req.user) {
          // The user is not logged in, send back an empty object
          res.json({});
        } else {
            console.log("in route")
          db.User.find({
            memberStatus: req.params.id    
          }).then(function (results) {
            res.json(results);
          })
        }
      });



}