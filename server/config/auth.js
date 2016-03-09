var passport = require('passport');
var GitHubStrategy = require('passport-github2');
var bodyParser = require('body-parser');
var session = require('express-session');

//var redis = require('redis');
//var client = redis.createClient();
var redisOptions = {host: '127.0.0.1', port: 6379};

var RedisStore = require('connect-redis')(session);

var userProfile;
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
    // Do whatever is needed to verify callback 
   return done(null, profile);
  });
}));

// Defines what to do to serialize
passport.serializeUser(function(user, done){
  done(null, user.id);                      
});

// Defines what to do when deserializing
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = function (app) {
  app.use(session({ store: new RedisStore(redisOptions), secret:  'peter piper picked a peck of pickled peppers'}));
  app.use(passport.initialize());
  app.use(passport.session());
  // temporary api routing
  app.use('/api/currentuser', function(req, res) {
    res.send(userProfile);
  });
};
