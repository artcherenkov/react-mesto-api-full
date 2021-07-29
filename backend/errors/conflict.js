const { Status } = require('../utils/err-status');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Status.CONFLICT;
  }
}

module.exports = ConflictError;
