var bodyParser = require('body-parser');
var path = require('path');
// checks that user is authenticated, redirects to /login if not
var ensureAuthenticated = function(req, res, next) {
  console.log('checking authentication for session:', req.sessionID);
  if (req.isAuthenticated()) {
    console.log('all good.');
    return next(); }
  else {
    res.redirect('/login')
  }
}

// TODO: Move to routes to an entry file in routes/ and middleware to config/middleware
module.exports = function(app, express, io) {
  // Route-tracking middleware
  app.use(function(req, res, next) {
    console.log(req.url);
    next();
  }); 
  
  // Router initialization
  var authRouter = express.Router();
  var apiRouter = express.Router(); 

  // Setup body parser and bodyParser.json middleware
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // Config - dotenv and authorization  
  require('./config/config')();  
  require('./config/auth')(app); 

  // Auth Route 
  require('./routes/authRoutes.js')(authRouter); 
  app.use('/auth/', authRouter);

  // Api Routes
  require('./routes/apiRoutes.js')(apiRouter);
  app.use('/api/', apiRouter);

  // Serves main App
  app.use('/app', ensureAuthenticated, express.static(__dirname + '/../public'));

  // Redirects to the App page if authenticated
  app.get('/', ensureAuthenticated, function(req, res, next) {
  res.redirect('/app');
  });
  
  //serve static directory
  app.use(express.static(__dirname + '/../public'));

  // handles logout by destroying session
  app.use('/logout', ensureAuthenticated, function(req, res) {
    req.session.destroy(function(err) {
      if (err) { 
        console.error(err); 
      } else {                   
        console.log('logged out!');
        res.redirect('/login');
      }
    });
  });

  // set up router for git webhooks 
  //  var repoRouter = express.Router();

  //routing for git events
  // require('./routes/gitRoutes.js')(repoRouter, io);
  //  app.use('/githubCallbackURL', repoRouter);
};
