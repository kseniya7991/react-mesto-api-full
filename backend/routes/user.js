const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequest = require('../errors/bad-req-err');

const {
  findUsers, findUser, updateUser, updateAvatar, showCurrentUser,
} = require('../controllers/user');

const method = (value) => {
  const correctLink = validator.isURL(value, { require_protocol: true });
  if (!correctLink) {
    return new BadRequest('Введены некорректные аватара пользователя');
  }
  return value;
};

// Поиск всех пользователей
router.get('/', findUsers);

// Возвращаем текущего пользователя
router.get('/me', showCurrentUser);

// Поиск конкретного пользователя по ID
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), findUser);

// Обновление данных пользователя
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

// Обновление аватара пользователя
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(method, 'Validation Link'),
  }),
}), updateAvatar);

module.exports = router;
