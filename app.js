require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
// const helmet = require('helmet');
// const limiter = require('./utils/rateLimit');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const corsUrl = [
  'https://artemmovies.nomoredomains.sbs',
  'http://artemmovies.nomoredomains.sbs',
  'http://localhost:3000',
  'https://locahost:3000',
];

const { PORT = 3000 } = process.env;
const app = express();

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (corsUrl.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});
// app.use(limiter);
// app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(routes);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/moviesdb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Working Port ${PORT}`);
});
