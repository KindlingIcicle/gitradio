var passport = require('passport');

module.exports = function(router) {
  // Login with github
  router.use('/login', passport.authenticate('github'))

  //Github Auth Callback URL - redirects to the same place as the root will check for authentication
  router.use('/callback', 
          passport.authenticate('github', { failureRedirect: '/' }),
          function(req, res) {
             res.redirect('/')
          });
};
