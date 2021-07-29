const { Status } = require('../utils/err-status');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Status.NOT_FOUND;
  }
}

module.exports = NotFoundError;
