var bodyParser = require('body-parser');
var path = require('path');

module.exports = function(app, express) {

  //set up express Router
  var gitRouter = express.Router();
  
  app.use(bodyParser.json());

  // Serve static files - socket compatible
  // app.use(express.static(__dirname + '/../public'));
  
  app.use('/githubCallbackUrl', gitRouter);
  // route to gitRoutes.js
  require('./routes/gitRoutes.js')(gitRouter);

};
