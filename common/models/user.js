'use strict';

var debug = require('debug')('loopback:app:user');

var jwt = require('jsonwebtoken');

module.exports = function(User) {
  User.auth0 = function (idToken, done) {
    var secret = 'LetJoLiam';

    jwt.verify(idToken, secret, function(err, decoded) {
      if (err) {
        debug(err);
      }
      done();
    });
  };

  User.remoteMethod('auth0', {
      accepts: {arg: 'idToken', type: 'string'},
      returns: {arg: 'result', type: 'string'}
    }
  );
};
