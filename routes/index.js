const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { registerUser, authUser } = require('../controllers/users');
const usersRoutes = require('./users.js');
const articlesRoutes = require('./articles.js');
const NotFoundError = require('../middlewares/errors/not-found-err');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), registerUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), authUser);

router.use('/users', auth, usersRoutes);
router.use('/articles', auth, articlesRoutes);
router.all('*', () => { throw new NotFoundError(); });

module.exports = router;
