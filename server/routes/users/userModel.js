var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  login: String,
  avatar_url: String,
  name: String,
});

module.exports = mongoose.model('User', UserSchema);
