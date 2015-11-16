var User = require('./userModel.js');

module.exports = {

  allUsers: function (req, res, next) {

    User.find({}, function(err, users){
      if (err) {
        console.error(err);
      } else {
        res.json(users);
      }
    });

  }

};
