const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const {
  celebrate,
  Joi,
  errors,
  Segments,
} = require('celebrate');
const mongoose = require('mongoose');
const { mongoUrl, mongoConfig } = require('./utils/utils');
// Routes
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
// Middlewarezzz
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errors');
// Errors
const NotFoundError = require('./errors/not-found-err');

const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

require('dotenv').config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(mongoUrl, mongoConfig);

app.post(
  '/signin',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8).max(30),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string()
        .required()
        .regex(/^[a-z0-9_-]{8,}$/),
      name: Joi.string().regex(/^[a-z0-9_-]{2,30}$/),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(
        /https?:\/\/[-a-zA-Z0-9+-._~:/?#[\]@!$'()*+,;=&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9++-._~:/?#[\]@!$'()*+,;=&/=]*)?/i,
      ),
    }),
  }),
  createUser,
);
app.use(auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.all('*', () => {
  throw new NotFoundError('Запрошен несуществующий роутер');
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер на порту ${PORT}`);
  // eslint-disable-next-line no-console
  console.log(process.env.JWT_SECRET);
});
