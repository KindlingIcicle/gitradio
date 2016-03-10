var request = require('request');
var GITHUB_API = process.env.GITHUB_API;

var getRequestOpts = function(req, res, next) {
  var options = {
    headers: {
      'Authorization': 'token ' + req.user.access_token,
      'User-Agent': process.env.USER_AGENT
    }
  }

  req.opts = options;
  next();
}; 

var makeGithubRequest = function(req, res) {
  request(req.opts, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      console.log('error:',error, response.statusCode);
    }
  });
};

module.exports = function(router) {
  // Gets repo information
  router.get('/me/repos/:repo', getRequestOpts, function(req, res) {
    req.opts.url = GITHUB_API + 'repos/' + req.user.profile.username + '/' + req.params.repo;
    makeGithubRequest(req, res);
  });

  // Gets list of users repos
  router.get('/me/repos', getRequestOpts, function(req, res) {
    req.opts.url = GITHUB_API + 'user/repos';
    makeGithubRequest(req, res);
  });

  // Gets profile of logged-in user if authenticated.
  router.use('/me', function(req, res) {
    if (!req.user) { 
      res.sendStatus(403); 
    } else {
    console.log('got it! sending back req.user:', req.user.profile.displayName);
    res.send(req.user.profile);
    }
  }); 

};
