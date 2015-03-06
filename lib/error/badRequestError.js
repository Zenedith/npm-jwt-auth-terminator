var util = require('util');

var BadRequestError = function (message, cause) {
  Error.call(this);

  this.name = 'BadRequestError';
  this.message = message;
  this.cause = cause;
};

util.inherits(BadRequestError, Error);
module.exports.BadRequestError = BadRequestError;