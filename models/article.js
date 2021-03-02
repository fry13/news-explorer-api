const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
      message: (props) => `${props.value} некорректная ссылка!`,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
      message: (props) => `${props.value} некорректная ссылка!`,
    },
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
