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

// middleware that makes GET request to Github. Before this middleware, req.opts.url should be set
// TODO: auto-paginate
var makeGithubGetRequest = function(req, res, next) {
  request(req.opts, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // append to req and pass to middleware
      req.body = body;
      next(req, res);
    } else {
      console.log('error:',error, response.statusCode);
    }
  });
};

// middleware that makes POST request to create webhook on github
var createGithubHook = function(req, res) {
  request.post(req.opts, function(error, response, body) {
    // add to db
    res.sendStatus(response.statusCode);
  });
};

module.exports = function(router) {
  // Gets repo information
  router.get('/me/repos/:repo', getRequestOpts, function(req, res) {
    req.opts.url = GITHUB_API + 'repos/' + req.user.username + '/' + req.params.repo + '/events';

    makeGithubGetRequest(req, res, function(req, res) {
      res.send(req.body);
    });
  });

  // Gets list of users repos
  router.get('/me/repos', getRequestOpts, function(req, res) {
    req.opts.url = GITHUB_API + 'user/repos';

    req.opts.params = {
      affiliation: 'owner,collaborator,organization_member',
      type: 'all',
    };

    makeGithubGetRequest(req, res, function(req, res, next) {
      res.send(req.body);
    });
  });

  // Gets profile of logged-in user if authenticated.
  router.get('/me', function(req, res) {
    if (!req.user) {
      res.sendStatus(403);
    } else {
      //console.log('SERVER: got it! sending back req.user:', req.user.profile.displayName);
      res.send(req.user);
    }
  });

  // creates repo according to current user
  router.post('/me/hooks/create/:owner/:name', getRequestOpts, function(req, res) {
    //TODO: handle callback_url for different webhooks, handle SSL
    // config object for webhook POST
    // creates callback URL : '/api/hooks/:username/:repoOwner/:repoName'
    var callbackURL = '/api/hooks/' + req.user.username + '/' + req.params.repoOwner + '/' + req.params.owner + '/' + req.params.name;
    var defaultScopes = ['push'];
    var config = {
      url: callbackURL,
      content_type: 'json',
      insecure_ssl: true
    };

    // TODO: allow webhook to be created on org instead of just on user repo
    req.opts.url = GITHUB_API + 'repos/' + req.params.owner + '/' + req.params.name + '/hooks';
    req.opts.json = true;

    // TODO: allow user choosing of events to subscribe to
    req.opts.body =  {
      name: 'web',
      active: true,
      events: req.params.scopes || defaultScopes,
      config: config
    };

    createGithubHook(req, res);
  });
};
