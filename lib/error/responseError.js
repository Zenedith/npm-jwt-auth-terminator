'use strict';

var ResponseError = function (code, message, statusCode, userMessage) {
  this.code = code;
  this.message = message;
  this.statusCode = statusCode;
  this.userMessage = userMessage;
};

exports.ResponseError = ResponseError;