var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');

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
  
  //serve static directory
  app.use(express.static(__dirname + '/../public'));

  //routing for git events
  app.use('/githubCallbackURL', gitRouter);
  require('./routes/gitRoutes.js')(gitRouter, io);
};
