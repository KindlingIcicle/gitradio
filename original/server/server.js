var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/kindlingicicle');

require('./config/middleware.js')(app, express);

var port = process.env.PORT || 5123;
app.listen(port);
console.log('server running at:', port);

module.exports = app;

