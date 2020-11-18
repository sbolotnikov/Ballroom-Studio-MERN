const express = require("express");
const session = require("express-session");
const mongoose = require('mongoose');
const passport = require("./config/passport");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const db = require("./models");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
// console.log(process.env.GOOGLE_CLIENT_ID);
//       console.log(process.env.GOOGLE_CLIENT_SECRET);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
require("./routes/api-routes.js")(app);
require("./routes/email-routes.js")(app);
require("./routes/google-auth-routes.js")(app);
require("./routes/steps-routes.js")(app);
require('./routes/invoice-routes.js')(app);


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ballroom-studio', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
mongoose.set('toJSON', { virtuals: true });
app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});


