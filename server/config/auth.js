var passport = require('passport');
var GitHubStrategy = require('passport-github2');
var bodyParser = require('body-parser');
var session = require('express-session');

// Passport Configuration
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},
// 'Verify' callback - accepts credentials and invokes a callback with the user object
function(accessToken, refreshToken, profile, done) {
  // Emulate accessing db 
  process.nextTick(function() {
    // do something here
   console.log(profile);  
   return done(null, profile);
  });
}));

// Defines what to do to serialize
passport.serializeUser(function(user, done){
  done(null, user);                      
});

// Defines what to do when deserializing
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = function (app) {
  app.use(session({ secret:  'peter piper picked a peck of pickled peppers' }));
  app.use(passport.initialize());
  app.use(passport.session());
};
