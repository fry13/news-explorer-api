const { ForbiddenErrorMsg } = require('../../configs/errMessages')

class ForbiddenError extends Error {
  constructor(message = ForbiddenErrorMsg) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
