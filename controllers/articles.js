const jwt = require('jsonwebtoken');
const Article = require('../models/article');

const NotFoundError = require('../middlewares/errors/not-found-err');
const BadRequestError = require('../middlewares/errors/bad-request');
const ForbiddenError = require('../middlewares/errors/forbidden');

const getArticles = (req, res, next) => {
  const userId = req.user.id;
  Article.find({ owner: userId })
    .then((articles) => res.send(articles))
    .catch(next);
};

const postArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.send(article))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError();
      }
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById({ _id: req.params.id }).select('+owner')
    .orFail(new NotFoundError('Статья не найдена'))
    .then((article) => {
      const decoded = jwt.decode(req.headers.authorization.replace('Bearer ', ''));
      if (article.owner.toString() !== decoded.id) {
        throw new ForbiddenError();
      }
      Article.deleteOne({ _id: req.params.id })
        .then((deletedArticle) => res.send(deletedArticle));
    })
    .catch(next);
};

module.exports = { getArticles, deleteArticle, postArticle };
