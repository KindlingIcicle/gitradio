// -------------------------------------------------------------
// EXPERIMENTAL FEATURE: USER-SUBMITTED WEBHOOK CREATION
// Register a new app with Github to be able to let users
// create new OAuth tokens
// https://github.com/settings/applications/new
// -------------------------------------------------------------

var ids = {
  // Note: Save this file as 'oauth.js'
  github: {
    clientID: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
  }
};

module.exports = ids;
