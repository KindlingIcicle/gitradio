var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var io = require('socket.io')(http);

// database setup
//var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/kindlingicicle');

// Env variables
var PORT = process.env.PORT || 3000;

// middleware for routing
require('./server/middleware.js')(app, express);


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
module.exports = app;
