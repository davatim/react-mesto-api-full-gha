const jwt = require('jsonwebtoken');
const {
  ANAUTHORUZED_REQUEST_401,
} = require('../utils/errors/errors');

module.exports.auth = (req, _res, next) => {
  const token  = req?.cookies?.jwt;
  console.log(token)
  let payload;

  try {
    payload = jwt.verify(token, 'super-secret-kei');
  } catch (err) {
    return next(new ANAUTHORUZED_REQUEST_401('Пользователь не зарегистрирован'));
  }

  req.user = payload;
  return next();
};
