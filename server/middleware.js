var bodyParser = require('body-parser');
var path = require('path');
// inject sockets
module.exports = function(app, express, io) {
  
  app.get('/', function(req, res) {
    res.redirect('/login.html');
  });
  //serve static directory
  app.use(express.static(__dirname + '/../public'));


  
  // set up router for git webhooks 
  //  var repoRouter = express.Router();

  // set up router for auth
  var authRouter = express.Router();
  //
  //setup body parser
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  
  require('./config/config')();  
  require('./config/auth')(app); 

  //routing for auth
  require('./routes/authRoutes.js')(authRouter); 
  app.use('/auth/', authRouter);

  //routing for git events
  // require('./routes/gitRoutes.js')(repoRouter, io);
  //  app.use('/githubCallbackURL', repoRouter);
};
