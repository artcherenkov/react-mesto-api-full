const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found');
const ForbiddenError = require('../errors/forbidden');
const { Status } = require('../utils/err-status');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((c) => res.send({ data: c }))
    .catch(next);
};
module.exports.deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .populate('user')
    .then((c) => {
      if (!c) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      if (String(c.owner) !== req.user._id) {
        throw new ForbiddenError('Запрещено удалять чужие карточки');
      }
    })
    .then(() => Card.deleteOne({ _id: cardId })
      .populate('user')
      .then(() => res.status(Status.SUCCESS).send({ message: 'Карточка удалена' })))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError('При удалении карточки передан некорректный _id'),
        );
      }
      next(err);
    });
};
module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((c) => res.send({ data: c }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'При создании карточки переданы некорректные данные',
          ),
        );
      }

      next(err);
    });
};
module.exports.putLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((c) => {
      if (!c) {
        throw new NotFoundError('Карточка не найдена.');
      }
      res.status(Status.SUCCESS).send({ data: c });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError('При постановке лайка передан некорректный _id'),
        );
      }
      next(err);
    });
};
module.exports.deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((c) => {
      if (!c) {
        throw new NotFoundError('Карточка не найдена.');
      }
      res.status(Status.SUCCESS).send({ data: c });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError('При удалении лайка передан некорректный _id'),
        );
      }
      next(err);
    });
};
