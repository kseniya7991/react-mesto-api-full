const Card = require('../models/card');

// Импорт ошибок
const BadRequest = require('../errors/bad-req-err');
const NotFound = require('../errors/not-found-err');
const InternalServerError = require('../errors/internal-server-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.createCard = (req, res, next) => {
  async function createCard() {
    try {
      const userId = req.user._id;
      const { name, link } = req.body;
      const card = await Card.create({
        name,
        link,
        owner: userId,
      });
      return res.status(201).send({ card });
    } catch (err) {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Введены некорректные данные карточки'));
      }
      return next(new InternalServerError('На сервере произошла ошибка'));
    }
  }
  createCard();
};

module.exports.findCards = (req, res, next) => {
  async function findCards() {
    try {
      const cards = await Card.find({}).populate('user');
      return res.send(cards);
    } catch (err) {
      return next(new InternalServerError('На сервере произошла ошибка'));
    }
  }
  findCards();
};

module.exports.deleteCard = (req, res, next) => {
  async function deleteCard() {
    try {
      const deletedCard = await Card.findById(req.params.cardId);
      if (deletedCard && req.user._id === deletedCard.owner.toString()) {
        try {
          const card = await Card.findByIdAndRemove(req.params.cardId);
          return res.send({ card });
        } catch {
          return next(new InternalServerError('На сервере произошла ошибка'));
        }
      } else if (!deletedCard) {
        return next(new NotFound('Карточка с указанным ID не найдена'));
      } else {
        return next(new ForbiddenError('Нельзя удалить карточку другого пользователя'));
      }
    } catch (err) {
      if (err.name === 'CastError') {
        return next(new NotFound('Карточка с указанным ID не найдена'));
      }
      return next(new InternalServerError('На сервере произошла ошибка'));
    }
  }
  deleteCard();
};

module.exports.likeCard = (req, res, next) => {
  async function likeCard() {
    try {
      const card = await Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      );
      if (card) {
        return res.send(card);
      }
      return next(new NotFound('Карточка с указанным ID не найдена'));
    } catch (err) {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные для постановки/снятия лайка'));
      }
      return next(new InternalServerError('На сервере произошла ошибка'));
    }
  }
  likeCard();
};

module.exports.dislikeCard = (req, res, next) => {
  async function dislikeCard() {
    try {
      const card = await Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      );
      if (card) {
        return res.send(card);
      }
      return next(new NotFound('Карточка с указанным ID не найдена'));
    } catch (err) {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные для постановки/снятия лайка'));
      }
      return next(new InternalServerError('На сервере произошла ошибка'));
    }
  }
  dislikeCard();
};
