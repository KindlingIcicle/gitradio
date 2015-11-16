var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;
var ids = require('./server/oauth.js');
var User = require('./server/routes/users/userModel.js');

//=====  NODE_ENV  =======//
var PORT = process.env.PORT || 3000;

//=====  SOCKET CONNECTION  =======//
require('./server/sockets')(io);

//=====  DATABASE SETUP  =======//
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kindlingicicle');

//=====  PASSPORT AUTH  =======//
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log(user);
  console.log(obj);
  done(null, obj);
});

passport.use(new GithubStrategy({
  clientID: ids.github.clientID,
  clientSecret: ids.github.clientSecret,
  callbackURL: ids.github.callbackUrl
  },

  // Auth a new user
  function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    var user = {
      name: profile._json.name,
      avatar_url: profile._json.avatar_url,
      login: profile._json.login
    };

    // Store the user in database
    User.create(user);

    process.nextTick(function() {
      return done(null, profile);
    });
  }
));


//=====  MIDDLEWARE  =======//
require('./server/middleware.js')(app, express, io);

//=====  SERVER  =======//
http.listen(PORT, function() {
  console.log('listening on *:', PORT);
});

