var meta = require('./lib/meta');
var server = require('./lib/server');
var options = require('config');
var ResponseError = require('./lib/error/responseError').ResponseError;
var logger = require('./lib/logger/logger').logger;

var exports = {};

var app = server.createServer(options);
app.on('BadRequestError', function (res, err) {

  var response = new ResponseError('BadRequestError', err.message, 400, '');

  res.writeHead(400, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(response));

  return (true);
});

app.on('UnauthorizedError', function (res, err) {
  var response = new ResponseError('UnauthorizedError', err.message, 401, '');

  res.writeHead(401, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(response));

  return (true);
});

app.on('uncaughtException', function(req, res, err) {
  logger.warn('uncaught application exception', err);

  var response = new ResponseError('InternalServerError', 'Internal server error', 500, '');

  res.writeHead(500, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(response));

  return (true);
});

process.on('uncaughtException', function(err) {
  logger.error('uncaught PROCESS exception: ', err);
});


exports.VERSION = meta.VERSION;

module.exports = exports;