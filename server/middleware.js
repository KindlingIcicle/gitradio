var bodyParser = require('body-parser');
var path = require('path');

module.exports = function(app, express) {
  
  app.use(bodyParser.json());
  
  var gitRouter = express.Router();
  // Serve static files - socket compatible
  app.use(express.static(__dirname + '/../public'));

  app.use('/githubCallbackURL', gitRouter);
  require('./routes/gitRoutes.js')(gitRouter);

};
