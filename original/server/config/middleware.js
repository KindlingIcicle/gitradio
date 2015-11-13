var bodyParser = require('body-parser');
var path = require('path');

module.exports = function(app, express) {

  app.use(bodyParser.json());

  //
  // NOTE---> May need to adjust this path again for Heroku
  //          Currently set up for local testing
  //
  app.use(express.static(__dirname + '../../../client'));

  var githubHandler = function (req, res, next) {
    var head = req.headers;
    var body = req.body;
    var time = new Date();

    // Creates simple "event" object
    var event = {
      type: head['x-github-event'],
      time: time,
      user: body.sender.login,
      user_url: body.sender.url,
      user_avatar_url: body.sender.avatar_url,
      repo: body.repository.name
    };

    // Log the event
    console.log(event);

    // TODO: Pass the event to client via sockets
    //

    // TODO: Store in the mongo db
    // 

    // Respond to Github
    res.status(200).send("Thank you!");
  };

  // Callback url
  app.post('/githubCallbackURL', githubHandler);

};
