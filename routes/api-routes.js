// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
var moment = require('moment');
const mongoose = require('mongoose');
require('dotenv').config();

//email from Node.js
const nodemailer = require('nodemailer');

//configuration, will be moved to the emailConfig file in /config and exported once fully implemented
let transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

let mailOptions = {
  from: process.env.EMAIL_USERNAME,
  // the To becomes a variable
  to: 'recipient',
  // so will the text and subject
  subject: 'Test E-Mail from Node.js',
  text: 'It works!!!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  app.post("/api/signup", (req, res) => {
    console.log(req.body);
    db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        certLevel: req.body.certLevel,
        memberStatus: req.body.memberStatus,
        birthday: req.body.birthday
      })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        console.log(err)
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // get user profile if user is logged in
  app.get("/api/profile", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      console.log(req.user);
      res.json(req.user);
    }
  });

  // get session date for specific month
  app.get("/api/session_dates/month/:monthNumber", (req, res) => {
    let month = parseInt(req.params.monthNumber) - 1;
    let date = new Date();
    let firstDayOfMonth = new Date(date.getFullYear(), month, 1);
    let lastDayOfMonth = new Date(date.getFullYear(), month+1, 0);
    // console.log(firstDayOfMonth, lastDayOfMonth);
    db.Session.find({
      sessionCalendar: {
        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth
      }
    }).then(function (results) {
      res.json(results);
    });
  });

  // get session date for adult or non-adult classes
  app.get("/api/session_dates/adult/:isAdult", (req, res) => {
    db.Session.find({
      adultClass: req.params.isAdult
    }).then(function (results) {
      res.json(results);
    });
  });

  // get session date based on session type
  app.get("/api/session_dates/sessionType/:sessionType", (req, res) => {
    db.Session.find({
      sessionType: req.params.sessionType
    }).then(function (results) {
      res.json(results);
    });
  });

  app.get("/api/all_members", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.User.find().then(function (results) {
        res.json(results);
      })
    }
  });

  app.put("/api/register/sessions/:userId", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // console.log(req.body);
      req.body.data.map(e => {
        db.User.findOneAndUpdate({
            _id: req.params.userId
          }, {
            $push: {
              userSessions: {
                session: {
                  _id: mongoose.Types.ObjectId(e.sessionId),
                },
                sessionDate: e.sessionDate,
                length: e.length,
                isPresent: false
              }
            }
          }, {
            new: true
          })
          .then(results => {
            res.json(results);
          })
          .catch(err => {
            console.log(err);
          })
      });
    }
  });
  
  // GET/ user's session dates. IF user is a student, this returns all the user's sessions. 
  app.get("/api/my_sessions", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.User.find({
          _id: req.user._id
        }).populate('Session')
        .then(data => {
          res.json(data)
        }).catch(err => {
          res.send(err);
        })
    }
  });

  // GET/ user's session dates for specific month
  app.get("/api/my_sessions/month/:monthNumber", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      let month = parseInt(req.params.monthNumber) - 1;
      let date = new Date();
      let firstDayOfMonth = new Date(date.getFullYear(), month, 1);
      let lastDayOfMonth = new Date(date.getFullYear(), month+1, 0);
      db.User.find({
          _id: req.user._id
        }).populate({
          path: 'Session',
          sessionCalendar: {
            $gte: firstDayOfMonth,
            $lte: lastDayOfMonth
          }
        })
        .then(data => {
          res.json(data)
        }).catch(err => {
          res.send(err);
        })
    }
  });

  // Get sessions based on userId param. For Teacher or Admin
  app.get("/api/sessions/:userId", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.User.find({
          _id: req.params.userId
        }, {
          userSessions: true
        })
        .then(results => {
          res.json(results);
        }).catch(err => {
          res.send(err);
        });
    }
  });

  app.post("/api/new_session", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      const start = new Date(req.body.startDate);
      const end = new Date(req.body.endDate);

      const sessionCalendarDates = [];

      req.body.daysOfWeek.forEach(day => {
        let dates = getDaysBetweenDates(start, end, day, req.body.startTime);
        sessionCalendarDates.push(...dates);
      });
      sessionCalendarDates.sort((a, b) => a - b);
      console.log(sessionCalendarDates);

      db.Session.create({
        sessionName: req.body.sessionName,
        teachers: req.body.teachers.map(e => mongoose.Types.ObjectId(e)),
        level: req.body.level,
        inPersonLimit: parseInt(req.body.inPersonLimit),
        adultClass: req.body.adultClass,
        sessionDuration: req.body.sessionDuration,
        daysOfWeek: req.body.daysOfWeek,
        sessionCalendar: sessionCalendarDates
      }).then(function (results) {
        res.json({
          message: "Successfully added session"
        });
      }).catch(function(err) {
        res.send(err);
      })
    }
  });

  app.put('/api/profile/level_up/:userId', function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      db.User.updateOne({
          _id: req.params.userId
        }, {
          $set: {
            certLevel: req.body.certLevel,
            memberStatus: req.body.role
          }
        },{
          new: true
        })
        .then(results => {
          res.json(results);
        })
        .catch(err => {
          res.send(err);
        })
    }
  })

  app.put('/api/profile/:userId', function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      // console.log(req.body, "params ", req.params.id);
      db.User.updateOne({
        _id: req.params.userId
      }, {
        $set: {
          birthday: req.body.birthday,
          certLevel: req.body.certLevel,
          phoneNumber: req.body.phoneNumber,
          profilePhotoURL: req.body.profilePhotoURL,
        }
      },{
        new: true
      }).then(function (results) {
        console.log(results);
        res.json({});
      }).catch(function(err) {
        res.send(err);
      })
    }
  })
  // delete user
  app.delete('/api/profile/remove/:userId', function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      // console.log("params ", req.params.userId);
      db.User.deleteOne({
        _id: req.params.userId
      }).then(function (results) {
        res.json({});
      }).catch(function(err) {
        res.send(err);
      })
    }
  })

  // get all students in a particular session
  app.get("/api/session/registered/:sessionId", function (req, res) {
    if(!req.user) {
      res.redirect("/");
    } else {
      db.User.find({
        "userSessions.session": req.params.sessionId
      }).then (function (results) {
        res.json(results)
      }).catch(function(err) {
        res.send(err);
      })
    }
  })

  // post attendance for user for particular session
  app.put("/api/session/attendance/:sessionId", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      // console.log("params ", req.params.id);
      // console.log("body ", req.body);
      for (let i = 0; i < req.body.attendance.length; i++) {
        db.User.updateOne({
          _id: mongoose.Types.ObjectId(req.body.attendance[i].userId),
          "userSessions.session": mongoose.Types.ObjectId(req.params.sessionId)
        }, {
          $set:{
            "userSessions.$.isPresent": req.body.attendance[i].isPresent
          }
        }).then(function (results) {
          console.log(results);
        }).catch(function(err) {
          res.send(err);
        })
      }
      res.json({});
    }
  })
};

const getDaysBetweenDates = (start, end, weekDay, startTime) => {
  const weekDays = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6
  };
  const result = [];

  const day = weekDays[weekDay];
  const startHour = Math.floor(startTime);
  const startMinute = (startTime - startHour) * 60;

  const current = new Date(start);
  const endDate = new Date(end);

  current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
  current.setHours(startHour, startMinute);
  while (current <= endDate) {
    result.push(new Date(current));
    current.setDate(current.getDate() + 7);
  }
  return result;
}

const hasReachedInPersonLimit = async function (id) {

  const numberOfStudents = await db.User.count({
    "userSessions.session": id
  });
  const inPersonLimit = await db.Session.find({_id: id}, {'inPersonLimit':1});
  if (numberOfStudents >= inPersonLimit) {
    console.log(`class ${id} has reached limit`);
    return true;
  } else return false;
};

const updateResults = async function (results) {
  const updatedResults = [];

  for (const result of results) {
    if (await hasReachedInPersonLimit(result.id)) {
      result.dataValues["reachedLimit"] = true;
      updatedResults.push(result);
    } else {
      updatedResults.push(result);
    }
  }
  return updatedResults;
}