const { UnauthorizedErrorMsg } = require('../../configs/errMessages')

class UnauthorizedError extends Error {
  constructor(message = UnauthorizedErrorMsg) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
