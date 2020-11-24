const db = require("../models");
const passport = require("../config/passport");
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
require('dotenv').config();
const email = require('../config/emailConfig')

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

module.exports = (app) => {
  // FORGOT PASSWORD
  // This one needs to receive an object from the front end { email: "user@email.com" }
  app.post("/api/user_data/forgotpassword", function (req, res) {
    // Take in user email, search the database for a user where that email is a match
    db.User.findOne({ email: req.body.email })
      .then((response) => {
        // if no match, send back an error, otherwise, update the user's password to a random one
        if (response === null) { res.status(400).json({ error: "No result found. Please check the e-mail address you entered." }) }
        // Hash the random password so that it can be safely stored in the database
        else {
          let randomPassword = Math.floor(10000000 + Math.random() * 9000000).toString();
          // Update the user in DB with the hashed password, and flag their account as using a temp password
          db.User.findOneAndUpdate({ _id: response._id },
            { password: bcrypt.hashSync(randomPassword, bcrypt.genSaltSync(10), null), tempPassword: true })
            .then(result => {
              let mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: result.email,
                subject: `MERN Studios: Forgot Password`,
                text: `Your password has been temporarily reset to: ${randomPassword}
            If you did not request a new password, please contact us immediately.`
              };
              // send the e-mail to the user 
              console.log(mailOptions)
              transporter.sendMail(mailOptions, function (error, info) {
                // error success handling
                (error ? res.status(401).json({ message: 'Error: ' + error }) : res.json({ message: 'Success! Email sent. Check your Email and re-login ' + info.response }) )
              })
            })
            .catch((err) => {
              console.log(err);
              res.status(401).json({message: "unable to update record"});
            });

        }
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // if a user logs in with a password while temp is marked ture, they will be redirected to a page to make a new password
  // this takes in their new password from that page and updates their account
  // needs to receive object: { email: "user@email.com", password: "newpassword" }
  app.put("/api/user_data/changepassword", function (req, res) {
    console.log(req.body);
    // hash the password, update the record, and set temp to false now. 
    db.User.updateOne({ 
      _id: req.body.userId
    }, {
      $set:  { 
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null), 
        tempPassword: false 
      }
      },{ 
        new: true
      }).then((data) => {
        // Redirect the user to the login page
        res.json({ message: "success" })
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  })

  // get all students in a particular session
  app.get("/api/session/email/:sessionId", function (req, res) {
    if (!req.user) {
      res.redirect("/");
    } else {
      db.User.find({
        "userSessions.session": req.params.sessionId
      }).then(function (results) {

        // loop over the array of objects, grab each email address and turn it into a string
        let recipientList = results.map(x => x.email).toString();
        // create an e-mail to send to the users in the class
        let mailOptions = {
          from: process.env.EMAIL_USERNAME,
          // use the string of email addresses to send the email
          to: recipientList,
          //for testing purposes:
          // to: 'nlamonaco86@gmail.com,sbolotnikov@gmail,mike4506@gmail.com',
          // so will the text and subject
          subject: `You've Been Signed Up!`,
          // Textbox can contain HTML using template literal/inline styling as such:
          // html: `<html>` 
          text: `It works!`
        };
        // will send an e-mail to everyone in the class 
        transporter.sendMail(mailOptions, function (error, info) {
          // error handling
          (error ? console.log(error) : console.log('Email sent: ' + info.response))
        });
        // json is still sent to the front end as usual
        res.json(results)
      }).catch(function (err) {
        res.send(err);
      })
    }
  })

  // get one user and email them
  app.get("/api/users/email/:id", function (req, res) {
    if (!req.user) {
      res.redirect("/");
    } else {
      db.User.find({
        // uses the id param, can be switched to _id if preferred 
        id: req.params.id
      }).then(function (result) {
        // create an e-mail to send to the user
        let mailOptions = {
          from: process.env.EMAIL_USERNAME,
          to: result.email,
          //for testing purposes:
          // to: 'nlamonaco86@gmail.com,sbolotnikov@gmail,mike4506@gmail.com',
          // so will the text and subject
          subject: `A special offer Just for you!`,
          // Textbox can contain HTML using template literal/inline styling as such:
          // html: `<html>` 
          text: 'It works!!!'
        };
        // will send an e-mail  
        transporter.sendMail(mailOptions, function (error, info) {
          // error handling
          (error ? console.log(error) : console.log('Email sent: ' + info.response))
        });
        // json is still sent to the front end as usual
        res.json(results)
      }).catch(function (err) {
        res.send(err);
      })
    }
  })

  // Send the demo "Marketing" E-Mail
  app.get("/api/demo/email", function (req, res) {
    let mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: "",
      subject: `About MERN Studios`,
      html: email.marketing
    };

    transporter.sendMail(mailOptions, function (error, info) {

      (error ? console.log(error) : console.log('Email sent: ' + info.response))
    });
    res.json(results)
  })
  // .catch(function (err) {
  //   res.send(err);
  // })
};
