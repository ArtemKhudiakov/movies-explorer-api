require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const limiter = require('./utils/rateLimit');
const routes = require('./routes/index');
const cors = require('./utils/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { NODE_ENV, MONGODB_PROD } = process.env;
const { PORT, MONGODB_DEV } = require('./utils/env-config');

const app = express();
const errorHandler = require('./middlewares/errors');

app.use(limiter);
app.use(helmet());

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// MongoDB connection
mongoose.connect(NODE_ENV === 'production' ? MONGODB_PROD : MONGODB_DEV, {
  useNewUrlParser: true,
  autoIndex: true,
  useUnifiedTopology: true,
});

app.listen(PORT);
