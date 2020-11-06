// Requiring our models and passport as we've configured it
const db = require("../models");

module.exports = function (app) {

  // GET all topics
  app.get("/api/steps/all_topics", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      db.Topic.find({}).populate("author").then(function (results) {
        // results are available to us inside the .then
        res.json(results);
      }).catch(function (err) {
        res.send(err);
      })
    }
  });


  // Create a new topic
  app.post("/api/steps/new_topic", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      db.Topic.create({
        topic: req.body.topic,
        author: req.user._id
      }).then(function (results) {
        // `results` here would be the newly created topic
        res.end();
      }).catch(function (err) {
        res.send(err);
      });
    }
  });


  // delete topic by id
  app.delete("/api/steps/topic/:topicId", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      // console.log("params ", req.params.id);
      db.Topic.deleteOne({
        _id: req.params.topicId
      }).then(function (results) {
        // console.log(results);
        res.send("Topic has been deleted " + topicId);
      }).catch(function (err) {
        res.send(err);
      })
    }
  })

  // POST a new Step
  app.post("/api/steps/new_step", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      // console.log("Kick Data:");
      // console.log(req.body);
      db.Step.create({
        message: req.body.message,
        topic: req.body.topic,
        author: req.user.id
      })
        .then(function (results) {
          res.send();
        })
        .catch(function (err) {
          res.send(err)
        });
    }
  });


  // get all steps of 1 topic
  app.get("/api/steps/:topic", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      console.log("got to route")
      db.Step.find({

        topic: req.params.topic
      })
        .populate("author")

        .then(function (steps) {
          res.json(steps);
        }).catch(function (err) {
          res.send(err);
        });
    }
  });

  // delete all Steps of a topic 
  app.delete("/api/steps/:topic", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      db.Step.deleteMany({
        topic: req.params.topic
      }).then(function (results) {
        res.send(`Topic: ${req.params.topic}, has been deleted`);
      }).catch(function (err) {
        res.send(err);
      })
    }
  })

  // delete steps by id
  app.delete("/api/steps/step/:stepId", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      // console.log("params ", req.params.id);
      db.Step.deleteOne({
        _id: req.params.stepId
      }).then(function (results) {
        // console.log(results);
        res.send("Step has been deleted");
      }).catch(function (err) {
        res.send(err);
      })
    }
  })









  // GET all steps of 1 user
  app.get("/api/steps/profile/:profileId", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      db.User.findOne({
        _id: req.params.profileId
      }, {
        steps: true
      }).populate('Steps')
        .then(function (dbKicks) {

          res.json(dbKicks);
        }).catch(function (err) {
          res.send(err);
        })
    }
  });
};
//