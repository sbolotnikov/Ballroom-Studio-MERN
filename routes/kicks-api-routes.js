// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {

  app.get("/api/topicsall", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {

      db.KickTopic.findAll({}).then(function (results) {
        // results are available to us inside the .then
        res.json(results);
      });
    }
  });

  // get all kicks of 1 topic
  app.get("/api/topic/:id", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      db.Kick.findAll({
        where: {
          KickTopicId: req.params.id,
        },
        include: { model: db.User, attributes: ['firstName', 'lastName', 'profilePhotoURL'] }
      }).then(function (dbKicks) {
        res.json(dbKicks);
      });
    }
  });

// get kick's topic
app.get("/api/kickTopic/:id", function (req, res) {
  if (!req.user) {
    // The user is not logged in, send back to startup screen
    res.redirect("/");
  } else {
    db.Kick.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function (dbKicks) {

      res.json(dbKicks);
    });
  }
});

// find kickID
  app.post("/api/kickID", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      db.Kick.findOne({
        where: {
         message: req.body.message,
         UserId: req.body.UserId,
         KickTopicId: req.body.KickTopicId
        },
        
      }).then(function (dbKicks) {

        res.json(dbKicks);
      });
    }
  });

  // Add a kick
  app.post("/api/kicknew", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      console.log("Kick Data:");
      console.log(req.body);

      db.Kick.create({
        message: req.body.message,
        UserId: parseInt(req.body.UserId),
        KickTopicId: parseInt(req.body.KickTopicId)
      })
        .then(function (results) {
          console.log(results)
          res.end();
        })
        .catch(function (err) {
          console.log(err)
        });
    }
  });

  // delete topic 
  app.delete("/api/topic/:id", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      db.KickTopic.destroy({
        where: { id: req.params.id}
      }).then(function (results) {
        res.json({});
      })
    }
  })

  // delete kick by id
  app.delete("/api/kick/:id", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      console.log("params ", req.params.id);
      db.Kick.destroy({
        where: { id: req.params.id}
      }).then(function (results) {
        // console.log(results);
        res.json({});
      })
    }
  })

  // Add a new topickick
  app.post("/api/topicnew", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      console.log("Topic Data:");
      console.log(req.body);

      db.KickTopic.create({
        topicTitle: req.body.title
      }).then(function (results) {
        // `results` here would be the newly created topic
        res.end();
      });
    }
  });

};
