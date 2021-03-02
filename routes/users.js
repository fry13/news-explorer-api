const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { getMe } = require('../controllers/users');

router.get('/me', celebrate({
  headers: Joi.object({
    authorization: Joi.string().required().regex(/[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/),
  }).unknown(),
}), auth, getMe);

module.exports = router;
