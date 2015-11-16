var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;

//=====  NODE_ENV  =======//
var PORT = process.env.PORT || 3000;

//=====  SOCKET CONNECTION  =======//
require('./server/sockets')(io);

//=====  DATABASE SETUP  =======//
//var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/kindlingicicle');

//=====  PASSPORT AUTH  =======//
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, obj);
});

passport.use(new GithubStrategy({
  clientID: ids.github.clientID,
  clientSecret: ids.github.clientSecret,
  callbackURL: ids.github.callbackUrl
  },

  // Auth a new user
  function (accessToken, refreshToken, profile, done) {
    var username = profile._json.name;
    var avatarURL = profile._json.avatar_url;
    var login = profile._json.login;
    var location = profile._json.location;

    // TODO: Store and save the new user in a users db

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

