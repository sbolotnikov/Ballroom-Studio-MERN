const express = require("express");
const session = require("express-session");
const mongoose = require('mongoose');
const passport = require("./config/passport");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const db = require("./models");

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
// routes
// require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/google-auth-routes.js")(app);
require("./routes/steps-routes.js")(app);
require('./routes/stripe-routes.js')(app);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ballroom-studio', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});
