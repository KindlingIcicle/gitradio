var request = require('request');
var GITHUB_API = process.env.GITHUB_API;

// TODO: refactor middleware into middleware folder
// middleware that adds options object for requests
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

// middleware that makes GET request to Github. After this middleware, req.opts.url should be set
var makeGithubGetRequest = function(req, res) {
  request(req.opts, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      console.log('error:',error, response.statusCode);
    }
  });
};

// middleware that makes POST request to create webhook on github
var createGithubHook = function(req, res) {
  request.post(req.opts, function(error, response, body) {
    res.sendStatus(response.statusCode);
  });  
};

module.exports = function(router) {
  // Gets repo information
  router.get('/me/repos/:repo', getRequestOpts, function(req, res) {
    console.log('getting:', req.params.repo);
    req.opts.url = GITHUB_API + 'repos/' + req.user.data.login + '/' + req.params.repo + '/events';
    console.log('from:', req.opts.url);
    makeGithubGetRequest(req, res);
  });

  // Gets list of users repos
  router.get('/me/repos', getRequestOpts, function(req, res) {
    req.opts.url = GITHUB_API + 'user/repos';
    makeGithubGetRequest(req, res);
  });

  // Gets profile of logged-in user if authenticated.
  router.get('/me', function(req, res) {
    if (!req.user) { 
      res.sendStatus(403); 
    } else {
      //console.log('SERVER: got it! sending back req.user:', req.user.profile.displayName);
      res.send(req.user.data);
    }
  }); 

  // creates repo according to current user
  router.get('/me/hooks/add/:repo', getRequestOpts, function(req, res) {
    //TODO: handle different callback_urls for different webhooks, handle SSL
    // config object for webhook POST
    var config = {
      url: 'CALLBACK_URL',
      content_type: 'json',
      insecure_ssl: true 
    };

    // TODO: allow webhook to be created on org instead of just on user repo
    req.opts.url = GITHUB_API + 'repos/' + req.user.profile.username + '/' + req.params.repo + '/hooks';
    req.opts.json = true;
    
    // TODO: allow user choosing of events to subscribe to
    req.opts.body =  {
      name: 'web',
      active: true,
      events: ['push'],
      config: config
    };

    createGithubHook(req, res);
  });
};
