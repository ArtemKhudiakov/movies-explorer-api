require('dotenv').config();

const {
  PORT = 3000,
  MONGODB_DEV = 'mongodb://127.0.0.1:27017/moviesdb',
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  PORT,
  MONGODB_DEV,
  NODE_ENV,
  JWT_SECRET,
};
