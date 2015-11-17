// -------------------------------------------------------------
// EXPERIMENTAL FEATURE: USER-SUBMITTED WEBHOOK CREATION
// User database
// -------------------------------------------------------------

var userController = require('./userController.js');

module.exports = function (app) {

  app.param('code', userController.getLogin);

  app.route('/')
  .get(userController.allUsers);

  app.route('/:code')
  .get(userController.findUser);

};
