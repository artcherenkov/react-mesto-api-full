const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateAuth } = require('../joi-schemas/user');
const { login, createUser } = require('../controllers/users');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);

router.post('/signin', validateAuth, login);
router.post('/signup', validateAuth, createUser);

module.exports = router;
