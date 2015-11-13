var bodyParser = require('body-parser');
var path = require('path');

module.exports = function(app, express) {

  app.use(express.static(__dirname + '../client'));

  var testHandler = function (req, res, next) {
    console.log(req.method);
    res.status(200).send('It worked.');
  };

  // set up parser for webhook
  var jsonParser = bodyParser.json();

  // handles the github callback POST
  // This can be tested with running server with 'ngrok'
  var githubHandler = function (req, res, next) {
    var head = req.headers;
    var body = req.body;
    var time = new Date();

    // create "event" object that can be saved in database, or
    // streamed to client via sockets
    var event = {
      type: head['x-github-event'],
      time: time,
      user: body.sender.login,
      user_url: body.sender.url,
      user_avatar_url: body.sender.avatar_url,
      repo: body.repository.name
    };

    console.log(event);
    
    // tell Github thank you
    res.status(200).send("Thank you!");
  };

  app.post('/githubCallbackURL', jsonParser, githubHandler);

  app.get('/', testHandler);


};
