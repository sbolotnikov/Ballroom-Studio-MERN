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
      db.User.find({
        memberStatus: req.params.id
      }).then(function (results) {
        res.json(results);
      })
    }
  });
  // post New invoice
  app.post("/api/invoice/new", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.Invoice.create({
        manager: req.body.manager,
        customer: req.body.customer,
        installments: req.body.installments,
        expirationDate: req.body.expirationDate,
        sessions: req.body.sessions,
        discount: req.body.discount
      })
        .then(function (results) {
          res.send();
        })
        .catch(function (err) {
          res.send(err)
        });
    }
  });
  // get all invoices data brief
  app.get("/api/invoice/table", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      console.log("in route");
      db.Invoice.find().populate("customer")
        .then(function (results) {
          res.send(results);
        })
        .catch(function (err) {
          res.send(err)
        });
    }
  });
}