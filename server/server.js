var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

//serve up static directory
app.use(express.static('./client'));


var testHandler = function (req, res, next) {
  console.log(req.method);
  res.status(200).send('works?');
};

app.get(testHandler);

var port = process.env.PORT || 8888;

app.listen(port);

console.log('server running at:', port);
