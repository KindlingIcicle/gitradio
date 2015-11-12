var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('../client'));

var testHandler = function (req, res, next) {
  console.log(req.method);
  res.status(200).send('works?');
};

app.get(testHandler);

var port = 8888;

app.listen(port);

console.log('server running at:', port);
