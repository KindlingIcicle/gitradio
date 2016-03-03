var bodyParser = require('body-parser');
var path = require('path');

// inject sockets
module.exports = function(app, express, io) {
  
  //set up router for git repos
  var repoRouter = express.Router();

  //setup body parser
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  
  //serve static directory
  app.use(express.static(__dirname + '/../public'));

  //routing for git events
  require('./routes/gitRoutes.js')(repoRouter, io);
  app.use('/githubCallbackURL', repoRouter);
};
