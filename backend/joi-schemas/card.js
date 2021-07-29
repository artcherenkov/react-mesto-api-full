const { celebrate, Joi } = require('celebrate');
const { isUrl } = require('../utils/validation');

const schema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(isUrl, 'link'),
  }),
};

module.exports.validatePostCard = celebrate(schema);
module.exports.validateParameter = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});
