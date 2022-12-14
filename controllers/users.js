require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../error/badrequest-error');
const ConflictError = require('../error/conflict-error');
const AuthError = require('../error/auth-error');
const User = require('../models/users');
const { CONFLICT_ERR, BAD_REQUEST_ERR, AUTH_ERR } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const getCurrentUser = (req, res, next) => {
  const id = req.user._id;
  return User.findById(id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((data) => {
      res.send({
        name: data.name,
        _id: data._id,
        email: data.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERR));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERR));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-pass',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).send({ token });
    })
    .catch(() => {
      next(new AuthError(AUTH_ERR));
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERR));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERR));
        return;
      }
      next(err);
    });
};

module.exports = {
  createUser,
  updateUserInfo,
  getCurrentUser,
  login,
};
