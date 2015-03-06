var request = require('request');
var http = require('http');
var logger = require('./logger/logger').logger;
var extend = require('util')._extend;

var createServer = function (options) {
  var port = process.env.PORT || options.app.port || 3000;
  var authorizationParser = require('./authorization').authorizationParser(options['jwt-decoder']);

  var addHeaderValue = function (headers, key, val) {
    headers[options.app.authHeaderPrefix + key] = val;
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
  };

  var server = http.createServer(function (req, res) {
    var requestOptions = extend({}, options.proxy);

    resetAuthHeaders(req);

    if (req.headers.authorization) {

      var auth = [];

      try {
        auth = authorizationParser(req);
      }
      catch (e) {
        return server.emit(e.name, res, e, null);
      }

      delete req.headers.authorization;

      addHeaderValue(requestOptions.headers, 'client-id', auth.clientId);
      addHeaderValue(requestOptions.headers, 'user-id', auth.userId);
      addHeaderValue(requestOptions.headers, 'username', auth.username);
      addHeaderValue(requestOptions.headers, 'email', auth.email);
      addHeaderValue(requestOptions.headers, 'scope', auth.scope);
      addHeaderValue(requestOptions.headers, 'password', auth.password);
    }

    requestOptions.url = options.proxy.url + req.url;

    var x = request(requestOptions);
    req.pipe(x);
    return x.pipe(res);

  }).listen(port, function () {
    logger.info('%s listening at %s', options.app.name, port);
  });

  return server;
};

module.exports.createServer = createServer;
