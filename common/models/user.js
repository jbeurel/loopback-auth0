'use strict';

var debug = require('debug')('loopback:app:user');

var AuthenticationClient = require('auth0').AuthenticationClient;
var jwt = require('jsonwebtoken');
var g = require('strong-globalize')();
var request = require('request');


var auth0 = new AuthenticationClient({
  domain: 'jbeurel.eu.auth0.com',
  clientId: 'D1IoXa0zYmyXFGPiQGzT4kfKNf4XVMg4'
});

module.exports = function(User) {

  // User.disableRemoteMethod("login", true);
  User.disableRemoteMethod("upsert", true);
  User.disableRemoteMethod("create", true);
  User.disableRemoteMethod("createOrUpdate", true);
  User.disableRemoteMethod("replaceOrCreate", true);
  User.disableRemoteMethod("deleteById", true);
  User.disableRemoteMethod("updateAll", true);
  User.disableRemoteMethod("updateAttributes", false);
  User.disableRemoteMethod("createChangeStream", true);
  User.disableRemoteMethod("find", true);
  User.disableRemoteMethod("findById", true);
  User.disableRemoteMethod("findOne", true);
  User.disableRemoteMethod("confirm", true);
  User.disableRemoteMethod("count", true);
  User.disableRemoteMethod("exists", true);
  User.disableRemoteMethod("invoke", true);
  User.disableRemoteMethod("upsertWithWhere", true);
  User.disableRemoteMethod("replaceById", true);
  User.disableRemoteMethod("resetPassword", true);

  User.disableRemoteMethod("__count__accessTokens", false);
  User.disableRemoteMethod("__create__accessTokens", false);
  User.disableRemoteMethod("__delete__accessTokens", false);
  User.disableRemoteMethod("__destroyById__accessTokens", false);
  User.disableRemoteMethod("__findById__accessTokens", false);
  User.disableRemoteMethod("__get__accessTokens", false);
  User.disableRemoteMethod("__updateById__accessTokens", false);

  User.validatesUniquenessOf('user_id');

  delete User.validations.password;

  User.auth0 = function (authResult, done) {
    //TODO: Move this secret in a non versioned config file
    var secret = 'LetJoLiam';
    var defaultError = new Error(g.f('login failed'));
    defaultError.statusCode = 401;
    defaultError.code = 'LOGIN_FAILED';

    jwt.verify(authResult.idToken, secret, function(err, decoded) {
      if (err) {
        debug(err);
        return done(err);
      }

      auth0.users.getInfo(authResult.accessToken)
      .then(function(userInfo) {
        var user = JSON.parse(userInfo);
        User.upsertWithWhere({'user_id': user.user_id}, user, function (err, user) {
          if (err) {
            debug('An error is reported from upsert function: %j', err);
            return fn(defaultError);
          }

          user.createAccessToken(36000, function(err, token) {
            token.__data.user = user;
            done (err, token);
          });
        });
      }).catch(done);
    });
  };

  User.remoteMethod('auth0', {
      accepts: {arg: 'authResult', type: 'Object', http: { source: 'body' }, required: true},
      returns: {arg: 'user', type: 'Object', root: true},
      http: {verb: 'post'}
    }
  );
};
