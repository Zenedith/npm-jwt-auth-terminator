'use strict';

var domain = require('domain');
var request = require('request');
var http = require('http');
var logger = require('./logger/logger').logger;
var extend = require('util')._extend;
var UnauthorizedError = require('./error/unauthorizedError').UnauthorizedError;

var createServer = function (options) {
  var port = process.env.PORT || options.app.port || 3000;
  var authorizationParser = require('./authorization').authorizationParser(options['jwt-decoder']);

  var addHeaderValue = function (headers, key, val) {

    if (val) {
      headers[options.app.authHeaderPrefix + key] = val;
    }
  };

  var delHeaderValue = function (headers, key) {
    delete headers[options.app.authHeaderPrefix + key];
  };

  var resetAuthHeaders = function (req) {
    delHeaderValue(req.headers, 'client-id');
    delHeaderValue(req.headers, 'user-id');
    delHeaderValue(req.headers, 'username');
    delHeaderValue(req.headers, 'email');
    delHeaderValue(req.headers, 'scope');
    delHeaderValue(req.headers, 'password');
    delHeaderValue(req.headers, 'scheme');
    delHeaderValue(req.headers, 'jwt-token');
  };

  var server = http.createServer(function (req, res) {
    var d = domain.create();
    d.add(req);
    d.add(res);
    d.on('error', function onError(err) {
      server.emit('uncaughtException', req, res, err);
    });

    var requestOptions = extend({}, options.proxy);
    requestOptions.url = requestOptions.url.replace('tcp', 'http') + req.url;
    requestOptions.headers = [];

    resetAuthHeaders(req);

    if (req.headers.authorization) {

      var auth = {};

      try {
        auth = authorizationParser(req);
      }
      catch (err) {
        return server.emit(err.name, res, err, null);
      }

      delete req.headers.authorization;

      addHeaderValue(requestOptions.headers, 'client-id', auth.clientId);
      addHeaderValue(requestOptions.headers, 'user-id', auth.userId);
      addHeaderValue(requestOptions.headers, 'username', auth.username);
      addHeaderValue(requestOptions.headers, 'email', auth.email);
      addHeaderValue(requestOptions.headers, 'scope', auth.scope);
      addHeaderValue(requestOptions.headers, 'password', auth.password);
      addHeaderValue(requestOptions.headers, 'scheme', auth.scheme);
      addHeaderValue(requestOptions.headers, 'jwt-token', auth.token);
    }
    else {
      logger.debug('missing authorization token');
      var e = new UnauthorizedError('Missing authorization header');
      return server.emit(e.name, res, e, null);
    }

    d.run(function () {
      var x = request(requestOptions);
      req.pipe(x);
      return x.pipe(res);
    });

  }).listen(port, function () {
    logger.info('%s listening at %s', options.app.name, port);
  });

  return server;
};

module.exports.createServer = createServer;
