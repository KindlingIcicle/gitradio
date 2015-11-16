var userController = require('./userController.js');

module.exports = function (app) {

  app.route('/')
  .get(userController.allUsers);

};
