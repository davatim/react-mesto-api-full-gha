const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  ERROR_IN_REQUATION,
  ANAUTHORUZED_REQUEST_401,
  ERROR_404_NOTFOUND,
  CODE_CONFLICT,
} = require('../utils/errors/errors');

const INFO_200_SEC_SEND = 200;
const INFO_201_SEC_REC = 201;

module.exports.getUser = (_req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(next);
};
module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(
          new ERROR_404_NOTFOUND('Пользователь не найден на сервере'),
        );
      }
      return res.status(INFO_200_SEC_SEND).send({
        _id: user._id,
        name: user.name,
        about: user.about,
        email: user.email,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new ERROR_IN_REQUATION('Переданы некорректные данные на сервер'),
        );
      }
      return next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(INFO_200_SEC_SEND).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(
          new ERROR_IN_REQUATION('Переданны некорректные данные на сервер'),
        );
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt

    .hash(password, 10)
    .then((hash) =>

      User.create({
        name,
        about,
        avatar,
        email,
        password: hash
      })
    )

    .then((user) =>

      res.status(INFO_201_SEC_REC).send({
        _id: user._id,
        name: user.name,
        about: user.about,
        email: user.email,
        avatar: user.avatar
      })
    )

    .catch((err) => {
      if (err.code === 11000) {
        return next(new CODE_CONFLICT('Данный e-mail уже зарегистрирован'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ERROR_IN_REQUATION('Переданны неверные данные'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      // Хэш
      if (!user) {
        return next(
          new ANAUTHORUZED_REQUEST_401('Неправильная почта или пароль'),
        );
      }
      return bcrypt.compare(password, user.password).then((isEqual) => {
        if (!isEqual) {
          return next(
            new ANAUTHORUZED_REQUEST_401('Неправильная почта или пароль'),
          );
        }
        const token = jwt.sign({ _id: user._id }, 'super-secret-kei', {
          expiresIn: '7d',
        });
        res.cookie('jwt', token, {
          maxAge: 604800,
          httpOnly: true,
          sameSite: true,
        });
        // return res.status(INFO_200_SEC_SEND).send({ token });
        return res.status(INFO_200_SEC_SEND).send(user);
      });
    })
    .catch(next);
};

module.exports.logout = (_req, res, _next) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли' });
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(INFO_200_SEC_SEND).send(user))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.status(INFO_200_SEC_SEND).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(
          new ERROR_IN_REQUATION('Переданны некорректные данные на сервер'),
        );
      }
      return next(err);
    });
};
