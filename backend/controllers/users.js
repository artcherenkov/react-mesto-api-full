const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  handleUpdateProfileSuccess,
  handleUpdateProfileError,
} = require('../utils/controllers');

const BadRequestError = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found');
const ConflictError = require('../errors/conflict');

const { JWT_SECRET = 'super-strong-secret' } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((u) => res.send({ data: u }))
    .catch(next);
};
module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((u) => {
      if (!u) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: u });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError(
            'При получении пользователя передан некорректный _id',
          ),
        );
      }
      next(err);
    });
};
module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((u) => {
      if (!u) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send({ data: u });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError(
            'При получении данных о пользователе передан некорректный _id',
          ),
        );
      }
      next(err);
    });
};
module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then(handleUpdateProfileSuccess(res))
    .catch(handleUpdateProfileError(res, next));
};
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then(handleUpdateProfileSuccess(res))
    .catch(handleUpdateProfileError(res, next));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((u) => {
      const token = jwt.sign({ _id: u._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Вы успешно вошли в свой аккаунт.' });
    })
    .catch(next);
};
module.exports.createUser = (req, res, next) => {
  User.create({ ...req.body })
    .then((u) => {
      const createdUser = u;
      delete createdUser._doc.password;

      res.status(201).send({ data: createdUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'При создании пользователя переданы некорректные данные.',
          ),
        );
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        next(
          new ConflictError('Пользователь с таким email уже зарегистрирован.'),
        );
      }
    });
};
