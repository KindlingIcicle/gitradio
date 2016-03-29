var mongoose = require('mongoose');

// Defines userSchema for storing in mongodb
var userSchema = new mongoose.Schema({
  name: String,
  access_token: String,
  refresh_token: String,
  githubID: Number,
  username: String,
  hooks: [{ repo: String, scopes: [String], callback_url: String }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
