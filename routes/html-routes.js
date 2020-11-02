// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.status(401).json({});
    // res.sendFile(path.join(__dirname, "../client/src/pages/signup.js"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
  // pull chat Kicks.html
  app.get("/chat", isAuthenticated,(req, res) => {
    res.sendFile(path.join(__dirname, "../public/kicks.html"));
  });

  app.get("/google_registered", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/goog_account_registered.html"));
  });
};
