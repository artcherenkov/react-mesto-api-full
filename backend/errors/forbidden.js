const { Status } = require('../utils/err-status');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Status.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
