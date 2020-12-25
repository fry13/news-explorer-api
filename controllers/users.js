const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const jwtSign = require('../helpers/jwt-sign');
const ConflictError = require('../middlewares/errors/conflict');
const UnauthorizedError = require('../middlewares/errors/unauthorized');
const BadRequestError = require('../middlewares/errors/bad-request');

const getMe = (req, res, next) => {
  const decoded = jwt.decode(req.headers.authorization.replace('Bearer ', ''));
  User.findOne({ _id: decoded.id })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const registerUser = (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    throw new BadRequestError('Некорректные данные');
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('E-mail уже занят');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      User.create({ email, password: hash, name })
        .then(({ mail, _id }) => {
          res.send({ mail, _id });
        });
    })
    .catch(next);
};

const authUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Некорректые данные');
  }
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Пользователя с таким E-mail не существует');
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (matched) {
            const token = jwtSign(user._id);
            res.send(`Bearer ${token}`);
            return;
          }
          throw new UnauthorizedError('Неверный пароль');
        }).catch(next);
    })
    .catch(next);
};

module.exports = { registerUser, authUser, getMe };
