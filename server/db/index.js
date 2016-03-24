var mongoose = require('mongoose');

// Database URIs
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/gitradio';

module.exports = mongoose.connect(uristring, function(err, res) {
  if (err) {
    console.log('ERROR connecting to', uristring + '.', err);
  } else {
    console.log('Succeeded in connecting to', uristring);
  }
});
