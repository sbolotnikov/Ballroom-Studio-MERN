const mongoose = require('mongoose');
const db = require('../models');
const populateTab = require('./db-seed');

let seedData = {}
let users = [];
let sessions = [];

seedData = populateTab();
// console.log(seedData.userObj);

users = [...seedData.userObj];
sessions = [...seedData.sessionsObj];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ballroom-studio', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true 
});

// db.User.deleteMany({})
//   .then(() => db.User.collection.insertMany(users))
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

db.Session.deleteMany({})
  .then(() => db.Session.collection.insertMany(sessions))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });