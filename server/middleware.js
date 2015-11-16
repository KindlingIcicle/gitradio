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
    passport.authenticate('github', {scope: [ 'user:email' ] }),
    function (req, res) {
      // Go to Github to resolve
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
    res.redirect('/');
    });
  });

  app.post('/newHook', function (req, res) {

    var newurl = 'https://api.github.com/repos/whatrocks/whatrocks.github.io/hooks';
    var jsonObj = {
      "name": "web",
      "active": true,
      "events": [
        "push",
        "pull_request"
      ],
      "config": {
        "url": "http://9567e799.ngrok.io/githubCallbackURL",
        "content_type": "json"
      }
    };
    req.header['User-Agent'] = 'whatrocks';
    req.body = jsonObj;
    console.log(req.header);
    request(newurl).pipe(res);

  });

  //serve static directory
  app.use(express.static(__dirname + '/../public'));
  
  //db routes
  var userRouter = express.Router();
  app.use('/api/users', userRouter);
  require('./routes/users/userRoutes.js')(userRouter);


  //routing for git events
  app.use('/githubCallbackURL', gitRouter);
  require('./routes/gitRoutes.js')(gitRouter, io);
};
