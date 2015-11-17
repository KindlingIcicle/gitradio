// -------------------------------------------------------------
// EXPERIMENTAL FEATURE: USER-SUBMITTED WEBHOOK CREATION
// User database
// -------------------------------------------------------------


var User = require('./userModel.js');

module.exports = {

  getLogin: function (req, res, next) {
    req.login = req.params.code;
    next();
  },

  allUsers: function (req, res, next) {

    User.find({}, function(err, users){
      if (err) {
        console.error(err);
      } else {
        res.json(users);
      }
    });

  },

  findUser: function (req, res, next) {
    User.findOne({'login': req.login}, function (err, user) {
      if (err) {
        console.error(err);
      } else {
        res.json(user);
      }
    });
  }

};
