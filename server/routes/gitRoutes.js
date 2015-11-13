module.exports = function (app, io) {
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

    // Pass the event to client via sockets
    io.emit('event', event);
    // Log the event
    console.log(event);

    // TODO: Store in the mongo db

    // Respond to Github
    res.status(200).send("Thank you!");
  };

  //don't need 'callbackURL' again here as it's specified in middleware
  app.post('/', githubHandler);

};