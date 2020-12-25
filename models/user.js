const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Your name',
    required: [true, 'Введите имя'],
  },
  email: {
    type: String,
    required: [true, 'Введите E-mail'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: (props) => `${props.value} некорректный email!`,
    },
  },
  password: {
    type: String,
    required: [true, 'Введите пароль'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
