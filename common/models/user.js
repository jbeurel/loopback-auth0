'use strict';

var debug = require('debug')('loopback:app:user');

var jwt = require('jsonwebtoken');

module.exports = function(User) {
  User.auth0 = function (authResult, done) {
    var secret = 'LetJoLiam';

    jwt.verify(authResult.idToken, secret, function(err, decoded) {
      if (err) {
        debug(err);
      }
      done();
    });
  };

  User.remoteMethod('auth0', {
      accepts: {arg: 'authResult', type: 'Object', http: { source: 'body' }, required: true},
      returns: {arg: 'user', type: 'Object', root: true},
      http: {verb: 'post'}
    }
  );
};
