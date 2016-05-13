var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
//var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./server/db');
//=====  NODE_ENV  =======//
var PORT = process.env.PORT || 8000;

//=====  SOCKET CONNECTION  =======//
//require('./server/sockets')(io);

//=====  DATABASE SETUP  =======//
//var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/kindlingicicle');

//=====  MIDDLEWARE  =======//
//require('./server/middleware.js')(app, express, io);
require('./server/middleware.js')(app, express);

//=====  SERVER  =======//
http.listen(PORT, function() {
  console.log('listening on *:', PORT);
});
