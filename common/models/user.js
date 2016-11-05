'use strict';

var jwt = require('jsonwebtoken');

module.exports = function(User) {
  User.auth0 = function (idToken, done) {
    console.log('coucou idToken', idToken);
    var decoded = jwt.verify(idToken, 'ckhc7l-mcoUXp50Ze2TG7zERNc8axo70or3hS7ihVcr_zf6kF7Ewb7L0MU5braFR');
    console.log('coucou decoded', decoded);
    done();
  };

  User.remoteMethod('auth0', {
      accepts: {arg: 'idToken', type: 'string'},
      returns: {arg: 'result', type: 'string'}
    }
  );
};
