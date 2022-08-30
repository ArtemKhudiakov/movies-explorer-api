const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../error/auth-error');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Том Круз',
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Ошибка авторизации');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Ошибка авторизации');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
