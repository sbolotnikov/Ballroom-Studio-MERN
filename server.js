const express = require("express");
const session = require("express-session");
const mongoose = require('mongoose');
const passport = require("./config/passport");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
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
  useUnifiedTopology: true,
   useCreateIndex:true,
});
// mongoose.set('toJSON', { virtuals: true });
app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});

