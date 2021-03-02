const BadRequestError = require('./errors/bad-request');
const { CelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  if (err instanceof CelebrateError)  {
    throw new BadRequestError();
  } else
  if (!err.statusCode) {
    const { statusCode = 500, message } = err;
    res
      .status(statusCode)
      .send({
        message: statusCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });
  }
  res.status(err.statusCode).send({ message: err.message });
  next();
};
