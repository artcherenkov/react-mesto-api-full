const router = require('express').Router();
const { validatePostCard, validateParameter } = require('../joi-schemas/card');

const {
  getCards,
  deleteCardById,
  postCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

// GET /cards
router.get('/', getCards);

// DELETE /cards/:cardId
router.delete('/:cardId', validateParameter, deleteCardById);

// POST /cards
router.post('/', validatePostCard, postCard);

// PUT /cards/:cardId/likes
router.put('/:cardId/likes', validateParameter, putLike);

// DELETE /cards/:cardId/likes
router.delete('/:cardId/likes', validateParameter, deleteLike);

module.exports = router;
