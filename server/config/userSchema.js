var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: { type: String, trim: true }
  },
  access_token: String,
  refresh_token: String,
  githubID: Number,
  username: String,
  hooks: [{ repo: String, scopes: [String], callback_url: String }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
