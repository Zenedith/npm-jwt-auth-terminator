var ResponseError = function (restCode, message, statusCode, userMessage) {
  this.restCode = restCode;
  this.message = message;
  this.statusCode = statusCode;
  this.userMessage = userMessage;
};

exports.ResponseError = ResponseError;