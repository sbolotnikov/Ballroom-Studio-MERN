const express = require("express");
const session = require("express-session");
const mongoose = require('mongoose');
const passport = require("./config/passport");

const PORT = process.env.PORT || 8080;

// attaching socket.io to express http

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/google-auth-routes.js")(app);
require("./routes/steps-routes.js")(app);
require('./routes/stripe-routes.js')(app);

const http = require('http').createServer(app);
const io = require('socket.io')(http);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ballroom-studio', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// socket connection
io.on('connection', (socket) => {
  console.log('a user is connected over socket');
  socket.on('disconnect', ()=> {
      console.log('a user disconnected');
  });
  socket.on('steps dm', (msg) => {
      console.log({'steps dm': msg});
      io.emit('steps dm', msg);
  })
});

// using http through app to use socket.io
http.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});
