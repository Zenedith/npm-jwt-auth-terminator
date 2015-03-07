var logger = require('./logger/logger').logger;
var jwt = require('jwt-simple');
var BadRequestError = require('./error/badRequestError').BadRequestError;
var UnauthorizedError = require('./error/unauthorizedError').UnauthorizedError;

var parseBasic = function parseBasic(string) {
  var decoded;
  var index;
  var pieces;

  decoded = (new Buffer(string, 'base64')).toString('utf8');

  if (!decoded) {
    throw new BadRequestError('Authorization header invalid');
  }

  index = decoded.indexOf(':');

  if (index === -1) {
    throw new BadRequestError('Authorization header invalid');
  } else {
    pieces = [decoded.slice(0, index), decoded.slice(index + 1)];
  }

  return ({
    username: pieces[0],
    password: pieces[1],
    scheme: 'basic'
  });
};

var isExpiredBearer = function isExpiredBearer(decoded) {
  var epoch = parseInt(decoded.exp, 10);
  return new Date() > new Date(epoch * 1000);
};

var parseBearer = function parseBearer(string, options) {
  options = options || {};
  options.key = options.key || null;
  options.noVerify = options.noVerify || true;

  try {
    var decoded = jwt.decode(string, options.key, options.noVerify);
    if (!decoded) {
      logger.info('Unable to decode token: %s', string);
      throw new UnauthorizedError('Invalid authorization jwt token');
    }
  }
  catch (e) {
    logger.info('Unable to decode token:', e);
    throw new UnauthorizedError('Invalid authorization jwt token');
  }

  if (isExpiredBearer(decoded)) {
    throw new UnauthorizedError('Authorization token has expired');
  }

  return ({
    clientId: decoded['client_id'],
    userId: decoded['user_id'],
    username: decoded['user_name'],
    email: decoded['email'],
    scope: decoded['scope'],
    password: null,
    scheme: 'bearer'
  });
};

var authorizationParser = function authorizationParser(options) {

  function parseAuthorization(req) {
    var auth = {};

    if (!req.headers.authorization) {
      return auth;
    }

    var pieces = req.headers.authorization.split(' ', 2);

    if (!pieces || pieces.length !== 2) {
      throw new BadRequestError('Authorization header is invalid.');
    }

    switch (pieces[0].toLowerCase()) {
      case 'basic':
        auth = parseBasic(pieces[1]);
        break;
      case 'bearer':
        auth = parseBearer(pieces[1], options);
        break;
      default:
        break;
    }

    return auth;
  }

  return (parseAuthorization);
};

module.exports.authorizationParser = authorizationParser;
