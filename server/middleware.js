var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var request = require('request');

//inject sockets
module.exports = function(app, express, io) {
  //set up router for git routes
  var gitRouter = express.Router();
  
  //setup body parser
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // set up passport
  app.use(passport.initialize());
  app.use(passport.session());

  // auth routes
  app.get('/auth/github',
    passport.authenticate('github', {scope: [ 'user:email', 'admin:repo_hook' ] }),
    function (req, res) {
      // This goes to Github to resolve
  });

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
      res.redirect('/');
  });

  app.get('/login', function (req, res) {
    res.redirect('/auth/github');
  });

  app.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    res.redirect('/login');
    });
  });

  //serve static directory
  app.use(express.static(__dirname + '/../public'));

  //db api routes
  var userRouter = express.Router();
  app.use('/api/users', userRouter);
  require('./routes/users/userRoutes.js')(userRouter);

  //routing for git events
  app.use('/githubCallbackURL', gitRouter);
  require('./routes/gitRoutes.js')(gitRouter, io);
};
