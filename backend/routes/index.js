const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateAuth } = require('../joi-schemas/user');
const { login, logout, createUser } = require('../controllers/users');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

const crashTest = () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
};

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);

router.post('/signin', validateAuth, login);
router.post('/signup', validateAuth, createUser);
router.post('/logout', logout);

router.get('/crash-test', crashTest);

module.exports = router;
