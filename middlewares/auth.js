const jwt = require('jsonwebtoken');
const AuthError = require('../error/auth-error');
const { AUTH_REQ_ERR } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(AUTH_REQ_ERR);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-pass');
  } catch (err) {
    throw new AuthError(AUTH_REQ_ERR);
  }
  req.user = payload;
  return next();
};
