const { isCelebrateError } = require('celebrate');

module.exports.handleErrors = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (isCelebrateError(err)) {
    res.status(400).send({ message: 'Введены некорректные данные' });
  }

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
};
