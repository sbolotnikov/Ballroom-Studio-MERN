const db = require("../models");
const passport = require("../config/passport");
const mongoose = require('mongoose');
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
          text: 'It works!!!'
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
