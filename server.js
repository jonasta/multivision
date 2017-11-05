var express = require('express');
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

var config = require("./server/config/config.js")[ env ];
require("./server/config/express.js")(app, config);
require("./server/config/mongo.js")(config);


//passport
var User = mongoose.model('User');
passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({userName: username}).exec(function (err, user) {
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })

  }
));
passport.serializeUser(function (user, done) {
  if (user) {
    done(null, user._id);
  }
});

passport.deserializeUser(function (id, done) {
  User.findOne({_id: id}).exec(function (err, user) {
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
});

require("./server/config/routes.js")(app);
app.listen(config.port);
console.log('listening on port ' + config.port);