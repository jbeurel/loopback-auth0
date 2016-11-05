'use strict';

var jwt = require('jsonwebtoken');

module.exports = function(User) {
  User.auth0 = function (idToken, done) {
    var secret = 'LetJoLiam';

    jwt.verify(
      idToken,
      secret,
      function(err, decoded) {
        console.log('coucou err', err);
        console.log('coucou decoded', decoded);
        done();
    });
  };

  User.remoteMethod('auth0', {
      accepts: {arg: 'idToken', type: 'string'},
      returns: {arg: 'result', type: 'string'}
    }
  );
};
