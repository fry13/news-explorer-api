const { NotFoundErrorMsg } = require('../../configs/errMessages')

class NotFoundError extends Error {
  constructor(message = NotFoundErrorMsg) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
