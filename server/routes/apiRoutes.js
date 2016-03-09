module.exports = function(router) {
  // Returns logged-in user-profile if authenticated.
  router.use('/me', function(req, res) {
    if (!req.user) { 
      res.sendStatus(403); 
    } else {
    console.log('got it! sending back req.user:', req.user.displayName);
    res.send(req.user);
    }
  }); 
};
