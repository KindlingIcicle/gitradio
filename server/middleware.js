var bodyParser = require('body-parser');
var path = require('path');

// checks that user is authenticated, redirects to /login if not
var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

// TODO: Move to routes to an entry file in routes/ and middleware to config/middleware

module.exports = function(app, express, io) {
  // Route-tracking middleware
  app.use(function(req, res, next) {
    console.log(req.url);
    next();
  }); 
  
  // Router for auth
  var authRouter = express.Router();

  // Setup body parser and bodyParser.json middleware
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  
  require('./config/config')();  
  require('./config/auth')(app); 

  // Auth Routes 
  require('./routes/authRoutes.js')(authRouter); 

  app.use('/auth/', authRouter);

  // Serves main App
  app.use('/app', ensureAuthenticated, express.static(__dirname + '/../public'));

  // Redirects to the App page if authenticated
  app.get('/', ensureAuthenticated, function(req, res, next) {
    res.redirect('/app');
  });
  
  //serve static directory
  app.use(express.static(__dirname + '/../public'));

  // set up router for git webhooks 
  //  var repoRouter = express.Router();


  //routing for git events
  // require('./routes/gitRoutes.js')(repoRouter, io);
  //  app.use('/githubCallbackURL', repoRouter);
};
