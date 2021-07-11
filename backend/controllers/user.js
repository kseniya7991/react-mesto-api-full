const { JWT_SECRET, NODE_ENV } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Импорт ошибок
const BadRequest = require('../errors/bad-req-err');
const NotFound = require('../errors/not-found-err');
const InternalServerError = require('../errors/internal-server-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports.findUsers = (req, res, next) => {
  async function findUsers() {
    try {
      const users = await User.find({});
      return res.send({ users });
    } catch (err) {
      return next(new InternalServerError('На сервере произошла ошибка'));
    }
  }
  findUsers();
};

module.exports.findUser = (req, res, next) => {
  async function findUser() {
    try {
      const user = await User.findById(req.params.userId);
      if (user) {
        return res.send({ user });
      }
      return next(new NotFound('Пользователь c таким ID не найден'));
    } catch (err) {
      if (err.name === 'CastError') {
        return next(new NotFound('Пользователь c таким ID не найден'));
      }
      return next(new InternalServerError('На сервере произошла ошибка'));
    }
  }
  findUser();
};

module.exports.createUser = (req, res, next) => {
  async function createUser() {
    try {
      const {
        name, about, avatar, email, password,
      } = req.body;
      if (password) {
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({
          name, about, avatar, email, password: hash,
        });
        return res.status(201).send({
          user: {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            _id: user._id,
            email: user.email,
          },
        });
      }
      return next(new BadRequest('Введены некорректные данные пользователя'));
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ConflictError('Пользователь с таким email уже существует'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Введены некорректные данные пользователя'));
      }
      return next(new InternalServerError('На сервере произошла ошибка'));
    }
  }
  createUser();
};

module.exports.updateUser = (req, res, next) => {
  async function updateUser() {
    try {
      const userId = req.user._id;
      const { name, about } = req.body;
      const user = await User.findByIdAndUpdate(userId, { name, about },
        {
          new: true,
          runValidators: true,
        });
      if (user) {
        return res.send({ user });
      }
      return next(new NotFound('Пользователь c таким ID не найден'));
    } catch (err) {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Введены некорректные данные пользователя'));
      } if (err.name === 'CastError') {
        return next(new NotFound('Пользователь c таким ID не найден'));
      }
      return next(new InternalServerError('На сервере произошла ошибка'));
    }
  }
  updateUser();
};

module.exports.updateAvatar = (req, res, next) => {
  async function updateAvatar() {
    try {
      const userId = req.user._id;
      const { avatar } = req.body;
      const user = await User.findByIdAndUpdate(userId, { avatar },
        {
          new: true,
          runValidators: true,
        });
      if (user) {
        return res.send({ user });
      }
      return next(new NotFound('Пользователь c таким ID не найден'));
    } catch (err) {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Введены некорректные данные аватара пользователя'));
      } if (err.name === 'CastError') {
        return next(new NotFound('Пользователь c таким ID не найден'));
      }
      return next(new InternalServerError('На сервере произошла ошибка'));
    }
  }
  updateAvatar();
};

module.exports.showCurrentUser = (req, res, next) => {
  async function showCurrentUser() {
    try {
      const user = await User.findById(req.user._id);
      if (user) {
        return res.send({ user });
      }
      return next(new NotFound('Пользователь c таким ID не найден'));
    } catch (err) {
      if (err.name === 'CastError') {
        return next(new NotFound('Пользователь c таким ID не найден'));
      }
      return next(new InternalServerError('На сервере произошла ошибка'));
    }
  }
  showCurrentUser();
};

module.exports.login = (req, res, next) => {
  async function login() {
    try {
      const { email, password } = req.body;
      const user = await User.findUserByCredentials(email, password);
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res
        .cookie('token', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ token });
    } catch (err) {
      return next(new UnauthorizedError(err.message));
    }
  }
  login();
};
