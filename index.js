var fs = require('fs');
var meta = require('./lib/meta');
var server = require('./lib/server');
var options = require('config');
var ResponseError = require('./lib/error/responseError').ResponseError;
var logger = require('./lib/logger/logger').logger;

var exports = {};

fs.readFile('config/public.key', function (err, data) {
  if (err) {
    logger.debug('config/public.key read error: ', err);
    throw err;
  }

  options['jwt-decoder'] = {
    key: data,
    noVerify: false
  };

  var app = server.createServer(options);
  app.on('BadRequestError', function (res, err) {

    var response = new ResponseError('BadRequestError', err.message, 400, 'Przekazane dane są niepoprawne lub niepełne');

    var data = JSON.stringify(response);
    res.writeHead(400, {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    });
    res.end(data);

    return (true);
  });

  app.on('UnauthorizedError', function (res, err) {
    var response = new ResponseError('UnauthorizedError', err.message, 401, 'Aplikacja wymaga autoryzacji');

    var data = JSON.stringify(response);
    res.writeHead(401, {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    });
    res.end(data);

    return (true);
  });

  app.on('uncaughtException', function (req, res, err) {
    logger.warn('uncaught application exception', err);

    var response = new ResponseError('InternalServerError', 'Internal server error', 500, 'Serwis jest chwilowo niedostępny  - spróbuj ponownie za chwilę');

    var data = JSON.stringify(response);
    res.writeHead(500, {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    });
    res.end(data);

    return (true);
  });

  process.on('uncaughtException', function (err) {
    logger.error('uncaught PROCESS exception: ', err);
  });
});

exports.VERSION = meta.VERSION;

module.exports = exports;