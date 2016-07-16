'use strict';

var fs = require('fs');
var meta = require('./lib/meta');
var server = require('./lib/server');
var options = require('config');
var ResponseError = require('./lib/error/responseError').ResponseError;
var logger = require('./lib/logger/logger').logger;

var exports = {};

fs.readFile(options.app.oauthKeyPath, function (errKey, publicKeydata) {
  if (errKey) {
    logger.error('%s read error: ', options.app.oauthKeyPath, errKey);
    throw errKey;
  }

  options['jwt-decoder'] = {
    key: publicKeydata,
    noVerify: false
  };

  var app = server.createServer(options);
  app.on('BadRequestError', function (res, err) {

    var response = new ResponseError('BadRequestError', err.message, 400, 'Przekazane dane są niepoprawne lub niepełne');

    var data = JSON.stringify(response);
    res.writeHead(400, {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization'
    });
    res.end(data);

    return true;
  });

  app.on('UnauthorizedError', function (res, err) {
    var response = new ResponseError('UnauthorizedError', err.message, 401, 'Aplikacja wymaga autoryzacji');

    var data = JSON.stringify(response);
    res.writeHead(401, {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization'
    });

    res.end(data);

    return true;
  });

  app.on('uncaughtException', function (req, res, err) {
    logger.warn('uncaught application exception', err);

    var response = new ResponseError('InternalServerError', 'Internal server error', 500, 'Serwis jest chwilowo niedostępny  - spróbuj ponownie za chwilę');

    var data = JSON.stringify(response);
    res.writeHead(500, {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization'
    });
    res.end(data);

    return true;
  });

  process.on('uncaughtException', function (err) {
    logger.error('uncaught PROCESS exception: ', err);
  });

  process.title = options.app.name;
});

exports.VERSION = meta.VERSION;

module.exports = exports;