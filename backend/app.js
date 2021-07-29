const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const auth = require('./middlewares/auth');
const error = require('./middlewares/error');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const NotFoundError = require('./errors/not-found');
const { validateAuth } = require('./joi-schemas/user');

const { login, createUser } = require('./controllers/users');

const PORT = process.env.PORT || 3000;

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(limiter);
app.use(helmet());

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.post('/signin', validateAuth, login);
app.post('/signup', validateAuth, createUser);

app.use(() => {
  throw new NotFoundError('Ресурс не найден');
});

app.use(errors());
app.use(error);

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
