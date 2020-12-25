const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const UnauthorizedError = require('./errors/unauthorized');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    throw new UnauthorizedError('Вы не авторизованы');
  }
  const token = req.headers.authorization.replace('Bearer ', '');
  if (!token) {
    throw new UnauthorizedError('Вы не авторизованы');
  }

  let payload;

  try {
    payload = jwt.verify(token, (JWT_SECRET)); // .env
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Вы не авторизованы' });
  }
  req.user = payload;

  return next();
};
