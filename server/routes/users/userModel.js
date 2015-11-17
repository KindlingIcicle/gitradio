var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  login: String,
  avatar_url: String,
  name: String,
  token: String
});

module.exports = mongoose.model('User', UserSchema);
