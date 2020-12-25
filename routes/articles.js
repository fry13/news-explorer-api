const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { getArticles, deleteArticle, postArticle } = require('../controllers/articles');

router.get('/', getArticles);

router.post('/', celebrate({
  headers: Joi.object({
    authorization: Joi.string().required().regex(/[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/),
  }).unknown(),
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required().isoDate(),
    source: Joi.string().required(),
    link: Joi.string().regex(/(^https?:\/\/)?[a-z0-9~_\-.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i).required(),
    image: Joi.string().regex(/(^https?:\/\/)?[a-z0-9~_\-.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i).required(),
    owner: Joi.string().hex().length(24),
  }),
}), auth, postArticle);

router.delete('/:id', celebrate({
  headers: Joi.object({
    authorization: Joi.string().required().regex(/[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/),
  }).unknown(),
  params: Joi.object().keys({ id: Joi.string().length(24).hex() }),
}), auth, deleteArticle);

module.exports = router;
