const { Status } = require('../utils/err-status');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Status.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
