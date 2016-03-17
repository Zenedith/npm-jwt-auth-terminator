'use strict';

var util = require('util');

var UnauthorizedError = function (message, cause) {
  Error.call(this);

  this.name = 'UnauthorizedError';
  this.message = message;
  this.cause = cause;
};

util.inherits(UnauthorizedError, Error);
module.exports.UnauthorizedError = UnauthorizedError;