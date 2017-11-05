var express = require('express'),
  stylus = require('stylus'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport');

module.exports = function (app, config) {


  app.set('views', config.rootPath + '/server/views');
  app.set('view engine', 'jade');
  app.use(logger('dev'));


  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

//passport
  app.use(cookieParser());
  app.use(session({secret: "my super secret", resave: false, saveUnitialized: false}));
  app.use(passport.initialize());
  app.use(passport.session());


//stylus - compile function
  function compile(str, path) {
    return stylus(str).set('filename', path)
  }

  app.use(stylus.middleware(
    {
      src: config.rootPath + '/public',
      compile: compile
    }
  ));

//static route to /public
  app.use(express.static(config.rootPath + '/public'));

}