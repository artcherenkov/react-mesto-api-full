const NotFoundError = require('../errors/not-found');
const BadRequestError = require('../errors/bad-request');
const ConflictError = require('../errors/conflict');

module.exports.handleUpdateProfileSuccess = (res) => (profile) => {
  if (!profile) {
    throw new NotFoundError('Пользователь с указанным _id не найден');
  }
  res.send({ data: profile });
};
module.exports.handleUpdateProfileError = (res, next) => (err) => {
  switch (err.name) {
    case 'ValidationError': {
      next(
        new BadRequestError(
          'При обновлении профиля переданы некорректные данные.',
        ),
      );
      break;
    }
    case 'CastError': {
      next(
        new BadRequestError('При обновления профиля передан некорректный _id.'),
      );
      break;
    }
    case 'MongoError': {
      if (err.code === 11000) {
        next(
          new ConflictError('Пользователь с таким email уже зарегистрирован.'),
        );
      }
      break;
    }

    default:
      next(err);
  }
};
