const { ConflictErrorMsg } = require('../../configs/errMessages');

class ConflictError extends Error {
  constructor(message = ConflictErrorMsg) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
