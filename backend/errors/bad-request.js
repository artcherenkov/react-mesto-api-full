const { Status } = require('../utils/err-status');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Status.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
