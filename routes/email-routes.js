require('dotenv').config();
const email = require('../config/emailConfig')

//email from Node.js
const nodemailer = require('nodemailer');

let recipient = " "

//configuration, will be moved to the emailConfig file in /config and exported once fully implemented
let transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// get all students in a particular session
app.get("/api/session/registered/:sessionId", function (req, res) {
  if(!req.user) {
    res.redirect("/");
  } else {
    db.User.find({
      "userSessions.session": req.params.sessionId
    }).then (function (results) {

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
        // Textbox can contain HTML using template literal/inline styling 
        text: 'It works!!!'
      };
        // will send an e-mail to everyone in the class 
        transporter.sendMail(mailOptions, function(error, info){
        // error handling
        (error ? console.log(error) : console.log('Email sent: ' + info.response) )
      });  
    // json is still sent to the front end as usual
      res.json(results)
    }).catch(function(err) {
      res.send(err);
    })
  }
})