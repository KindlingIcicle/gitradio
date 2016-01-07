var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var path = require('path');

//=====  NODE_ENV  =======//
var PORT = process.env.PORT || 3000;

//=====  SOCKET CONNECTION  =======//
require('./server/sockets')(io);

//=====  MIDDLEWARE  =======//
require('./server/middleware.js')(app, express, io);

//=====  SERVER  =======//
http.listen(PORT, function() {
  console.log('listening on *:', PORT);
});

