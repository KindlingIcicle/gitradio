var bodyParser = require('body-parser');
var path = require('path');

module.exports = function(app, express) {
  var gitRouter = express.Router();
  
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  
  // Serve static files - socket compatible
  app.use(express.static(__dirname + '/../public'));

  app.use('/githubCallbackURL', gitRouter);
  require('./routes/gitRoutes.js')(gitRouter);

};
