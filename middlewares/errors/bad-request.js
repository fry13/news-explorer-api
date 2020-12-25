const { BadRequestErrorMSg } = require('../../configs/errMessages');

class BadRequestError extends Error {
  constructor(message = BadRequestErrorMSg) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
