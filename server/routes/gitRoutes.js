module.exports = function (app, io) {
   var githubHandler = function (req, res, next) {
    var head = req.headers;
    var body = req.body;
    var time = new Date();

    // Creates simple "event" object
    console.log(body);

    var formatTime = function(dateObj){
      var date = dateObj.toDateString();
      var hours = dateObj.getHours();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      var mins = dateObj.getMinutes();
      return date + ': ' + hours + ':' + mins + ' ' + ampm;
    };

    var event = {
      type: head['x-github-event'],
      time: formatTime(time),
      user: body.sender.login,
      user_url: body.sender.html_url,
      user_avatar_url: body.sender.avatar_url,
      repo: body.repository.name,
      repo_url: body.repository.html_url
    };

    // Pass the event to client via sockets
    io.emit('event', event);
    // Log the event
    console.log(event);

    // Respond to Github
    res.status(200).send("Thank you!");
  };

  //don't need 'callbackURL' again here as it's specified in middleware
  app.post('/', githubHandler);

};
