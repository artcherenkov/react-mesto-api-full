const validator = require('validator');
const BadRequestError = require('../errors/bad-request');

module.exports.isUrl = (v) => {
  if (!validator.isURL(v)) {
    throw new BadRequestError('передан неверный формат ссылки.');
  }
  return v;
};
