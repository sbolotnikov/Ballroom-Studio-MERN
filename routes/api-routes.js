// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
var moment = require('moment');
const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function (app) {
  // Route for member login
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route to signup a new member
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

  // Route to retrieve info of member who is currently logged in
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      console.log(req.user);
      res.json({
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        age: req.user.age,
        email: req.user.email,
        phoneNumber: req.user.phoneNumber,
        certLevel: req.user.certLevel,
        memberStatus: req.user.memberStatus,
        profilePhotoURL: req.user.profilePhotoURL,
        // cloudUploadName: process.env.CLOUDINARY_CLOUDNAME,
        // cloudUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET
      });
    }
  });

  // get class schedule for current week
  app.get("/api/class_schedule/:weekNumber", (req, res) => {
    const dateA = moment().week(req.params.weekNumber).startOf('week');
    const dateB = moment().week(req.params.weekNumber).endOf('week');
    console.log(dateA, dateB);
    db.Session.find({
      "sessionCalendar.date": {
        $gte: dateA,
        $lte: dateB
      }
    }).then(function (results) {
      res.json(results);
    });
  });

  // get class schedule based on level, isAdult, and current week
  app.get("/api/class_schedule/:level/:isAdult/:weekNumber", async (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      const dateA = moment().week(req.params.weekNumber).startOf('week');
      const dateB = moment().week(req.params.weekNumber).endOf('week');

      try {
        const results = await db.Session.find({
          "sessionCalendar.date": {
            $gte: dateA,
            $lte: dateB
          },
          level: req.params.level,
          adultClass: req.params.isAdult
        });
        console.log(results);
        // check if classes are full. If full add a flag to an updatedResults array
        const data = await updateResults(results);
        res.json(data);
      } catch (err) {
        res.json(err);
      }
    }
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

  app.put("/api/enroll", (req, res) => {
    console.log(req.body);
    const promises = req.body.data.map(e => {
      db.User.findOneAndUpdate({
          _id: e.UserId
        }, {
          $push: {
            userSessions: {
              session: {
                _id: mongoose.Types.ObjectId(e.SessionCalendarId),
              },
              isPresent: false
            }
          }
        }, {
          returnNewDocument: true
        })
        .then(results => {
          res.json(results);
        })
        .catch(err => {
          console.log(err);
        })
    });
  });

  app.get("/api/classes/:memberId/:weekNumber", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      const dateA = moment().week(req.params.weekNumber).startOf('week');
      const dateB = moment().week(req.params.weekNumber).endOf('week');

      db.User.find({
          _id: req.params.memberId
        }).populate({
          path: 'Session.sessionCalendar',
          "sessionCalendar.date": {
            $gte: dateA,
            $lte: dateB
          },
        })
        .then(data => {
          res.json(data)
        }).catch(err => {
          res.send(err);
        })
    }
  });

  app.get("/api/session_members/:id", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.User.find({
          "userSessions.session": req.params.id
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
        startTime: req.body.startTime,
        daysOfWeek: req.body.daysOfWeek,
        sessionCalendar: sessionCalendarDates.map(e => {
          return {
            date: e
          }
        })
      }).then(function (results) {
        res.json({
          message: "Successfully added session"
        });
      });
    }
  });

  app.put('/api/member/promote/:id', function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      db.User.update({
          _id: mongoose.Types.ObjectId(req.params.id)
        }, {
          $set: {
            certLevel: req.body.certLevel,
            memberStatus: req.body.role
          }
        })
        .then(results => {
          res.json(results);
        })
        .catch(err => {
          console.log(err);
        })
    }
  })

  app.put('/api/member/profile/:id', function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      // console.log(req.body, "params ", req.params.id);
      db.User.update({
        _id: req.params.id
      }, {
        $set: {
          birthday: req.body.birthday,
          certLevel: req.body.certLevel,
          phoneNumber: req.body.phoneNumber,
          profilePhotoURL: req.body.profilePhotoURL,
        }
      }).then(function (results) {
        console.log(results);
        res.json({});
      })
    }
  })
  // delete user
  app.delete('/api/member/remove/:id', function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      console.log("params ", req.params.id);
      db.User.deleteOne({
        _id: mongoose.Types.ObjectId(req.params.id)
      }).then(function (results) {
        res.json({});
      })
    }
  })
  app.post("/api/session/attendance/:id", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back to startup screen
      res.redirect("/");
    } else {
      console.log("params ", req.params.id);
      console.log("body ", req.body);
      for (let i = 0; i < req.body.attendance.length; i++) {
        db.User.update({
          _id: mongoose.Types.ObjectId(req.body.attendance[i].id),
          "userSessions.session": mongoose.Types.ObjectId(req.params.id)
        }, {
          $set:{
            "userSessions.isPresent": req.body.attendance[i].isPresent
          }
        }).then(function (results) {
          console.log(results);
        })
      }
      res.json({});
    }
  })
};

const hasReachedInPersonLimit = async function (id) {

  const numberOfStudents = await db.UserSessions.count({
    where: {
      CalendarSessionId: id,
    }
  });
  const queryResults = await db.CalendarSessions.findOne({
    where: {
      id: id
    },
    include: {
      model: db.Sessions,
    }
  });
  if (numberOfStudents >= queryResults.Session.dataValues.inPersonLimit) {
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

  current.setHours(startHour, startMinute);
  current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
  while (current <= endDate) {
    result.push(new Date(current));
    current.setDate(current.getDate() + 7);
  }
  return result;
}