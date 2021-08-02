const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const { errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const error = require('./middlewares/error');
const router = require('./routes');
const NotFoundError = require('./errors/not-found');
const UnauthorizedError = require('./errors/unauthorized');

const auth = require('./middlewares/auth');

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
app.use(limiter);
app.use(helmet());
app.use(cors);

app.use('/', router);

app.use(errorLogger);

app.use(auth, (req) => {
  if (!req.user) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  throw new NotFoundError('Ресурс не найден');
});

app.use(errors());
app.use(error);

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
