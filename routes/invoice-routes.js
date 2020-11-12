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
      db.Invoice.find().populate("customer")
        .then(function (results) {
          res.send(results);
        })
        .catch(function (err) {
          res.send(err)
        });
    }
  });
  // get 1 invoice data 
  app.get("/api/invoice/:id", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.Invoice.findOne({
        _id: req.params.id
      }).populate("customer")
        .then(function (results) {
          res.send(results);
        })
        .catch(function (err) {
          res.send(err)
        });
    }
  });
// update invoice
  app.put('/api/invoice/:id', function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      db.Invoice.updateOne({
        _id: req.params.id
      }, {
        $set: {
          manager: req.body.manager,
          customer: req.body.customer,
          installments: req.body.installments,
          expirationDate: req.body.expirationDate,
          sessions: req.body.sessions,
          discount: req.body.discount,
        }
      }).then(function (results) {
        res.json({});
      }).catch(function(err) {
        res.send(err);
      })
    }
  })
  // delete invoice by id
  app.delete("/api/invoice/:id", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      console.log("in route");
      db.Invoice.deleteOne({
        _id: req.params.id
      }).then(function (results) {
        console.log(results);
        res.send("Invoice has been deleted");
      }).catch(function (err) {
        res.send(err);
      })
    }
  })
}
// ,{
//   new: true
// }