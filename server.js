const express = require("express");
const session = require("express-session");
const mongoose = require('mongoose');
const passport = require("./config/passport");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const db = require("./models");
////////COMMENT BACK IN ON DEMO DAY & RUN LOCALLY DURING DEMO /////////
// require('dotenv').config();
// const email = require('./config/emailConfig');
//////////////////////////////////////////////////////////////////////
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// routes
// require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/email-routes.js")(app);
require("./routes/google-auth-routes.js")(app);
require("./routes/steps-routes.js")(app);
require('./routes/stripe-routes.js')(app);
require('./routes/invoice-routes.js')(app);


/////////////// COMMENT BACK IN ON DEMO DAY & RUN LOCALLY DURING DEMO //////////
// const nodemailer = require('nodemailer');
// let transporter = nodemailer.createTransport({
//   service: process.env.EMAIL_SERVICE,
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD
//   }
// });
// const testEmail = () => {
//   let mailOptions = {
//     from: process.env.EMAIL_USERNAME,
//     to: "vdelacuetara@gmail.com,medot2@gmail.com",
//     subject: `About MERN Studios`,
//     html: email.marketing
//   };
//   transporter.sendMail(mailOptions, function (error, info) {
//     (error ? console.log(error) : console.log('Email sent: ' + info.response))
//   });
// }
// testEmail();
////////////////////////////////////////////////////////////////////////////////

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ballroom-studio', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
mongoose.set('toJSON', { virtuals: true });
app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});


