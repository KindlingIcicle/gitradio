var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var path = require('path');
// database setup
//var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/kindlingicicle');

// Env variables
var PORT = 3000 || process.env.PORT;

// middleware for routing
// require('./server/middleware.js')(app, express);
  app.use(bodyParser.json());

  app.use(express.static(__dirname + '/public'));

/**==================
      GITHUB API
====================*/
// Serve static files - socket compatible


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

  // Pass the event to client via sockets
  io.emit(event.type, event);
  
  console.log(event);

  // TODO: Store in the mongo db
  // 

  // Respond to Github
  res.status(200).send("Thank you!");
};


app.post('/githubCallbackURL', githubHandler);


/**==================
      SOCKETS
====================*/
io.on('connection', function(socket){
  console.log('connected user!');
  socket.on('looping', function() {
    console.log('Server heard it!');
    io.emit('looping');
  });

});

//server setup
http.listen(PORT, function() {
  console.log('listening on *:', PORT);
});


// export app
module.exports = io;

