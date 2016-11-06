'use strict';

var debug = require('debug')('loopback:app:user');

var AuthenticationClient = require('auth0').AuthenticationClient;
var jwt = require('jsonwebtoken');
var request = require('request');


var auth0 = new AuthenticationClient({
  domain: 'jbeurel.eu.auth0.com',
  clientId: 'D1IoXa0zYmyXFGPiQGzT4kfKNf4XVMg4'
});

module.exports = function(User) {
  User.auth0 = function (authResult, done) {
    var secret = 'LetJoLiam';

    jwt.verify(authResult.idToken, secret, function(err, decoded) {
      if (err) {
        debug(err);
      }

      auth0.users.getInfo(authResult.accessToken)
      .then(function(userInfo) {
        done(null, JSON.parse(userInfo));
      }).catch(function(err) {
        done(err);
      });
    });
  };

  User.remoteMethod('auth0', {
      accepts: {arg: 'authResult', type: 'Object', http: { source: 'body' }, required: true},
      returns: {arg: 'user', type: 'Object', root: true},
      http: {verb: 'post'}
    }
  );
};
