const { celebrate, Joi } = require('celebrate');
const { isUrl } = require('../utils/validation');

module.exports.validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

module.exports.validateUpdateProfile = celebrate({
  body: Joi.object()
    .min(1)
    .keys({
      email: Joi.string().email(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
});

module.exports.validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(isUrl, 'link'),
  }),
});

module.exports.validateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});
