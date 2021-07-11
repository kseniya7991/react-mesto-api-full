const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequest = require('../errors/bad-req-err');

const {
  findCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');

const method = (value) => {
  const correctLink = validator.isURL(value, { require_protocol: true });
  if (!correctLink) {
    return new BadRequest('Введены некорректные данные карточки');
  }
  return value;
};

/* custom(method, 'Validation Link') */
// Создание карточки
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(method, 'Validation Link'),
  }),
}), createCard);

// Поиск всех карточек
router.get('/', findCards);

// Удаление карточки
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteCard);

// Постановка/снятие лайка карточки
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), dislikeCard);

module.exports = router;
