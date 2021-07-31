const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');

const { JWT_SECRET = 'super-strong-secret' } = process.env;

const handleAuthError = (next) => {
  next(new UnauthorizedError('Необходима авторизация'));
};

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;
  console.log(`token: ${token}`);

  if (!token) {
    handleAuthError(next);
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
    console.log('payload:');
    console.log(payload);
  } catch (err) {
    handleAuthError(next);
  }

  req.user = payload;
  next();
};
