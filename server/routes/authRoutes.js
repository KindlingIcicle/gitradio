var passport = require('passport');
module.exports = function(router) {
  // Login with github
  router.use('/login', passport.authenticate('github'))

  //Github Auth Callback URL
  router.use('/callback', 
          passport.authenticate('github', { failureRedirect: '/' }),
          function(req, res) {
            //TODO: initiate session and redirect
            res.redirect('/index.html')
          }
         );
};
