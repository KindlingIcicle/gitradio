var passport = require('passport');
var GitHubStrategy = require('passport-github2');
var bodyParser = require('body-parser');
var session = require('express-session');

var RedisStore = require('connect-redis')(session);
var redisOptions = {host: process.env.REDIS_HOST, port: process.env.REDIS_PORT};
var GITHUB_CALLBACK_URL = process.env.GITHUB_DEV_CALLBACK_URL;

if (process.env.NODE_ENV === 'PRODUCTION') {
  GITHUB_CALLBACK_URL = process.env.GITHUB_PROD_CALLBACK_URL;
};

// Passport Configuration
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  scope: process.env.GITHUB_SCOPES,
  passReqToCallback: true
},
// 'Verify' callback - accepts credentials and invokes a callback with the user object
function(req, accessToken, refreshToken, profile, done) {
  // Emulate accessing db 
  process.nextTick(function() {
    // Do whatever is needed to verify 
    //TODO: build more explicit payload to be sent back so parsing occurs on server
   console.log('verifying...');

   var user = {
     access_token: accessToken,
     refresh_token: refreshToken,
     profile: profile
   };

   return done(null, user);
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
  app.use(session({ 
    store: new RedisStore(redisOptions), 
    resave: true,
    saveUninitialized: false, 
    secret: process.env.SECRET
  }));
  app.use(passport.initialize());
  app.use(passport.session());
};
