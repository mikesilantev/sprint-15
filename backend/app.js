const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  celebrate,
  Joi,
  errors,
  Segments,
} = require('celebrate');
const { mongoUrl, mongoConfig } = require('./utils/utils');
// Validation

// Routes
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
// Middlewarezzz
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errors');
// Errors
const NotFoundError = require('./errors/not-found-err');

const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

//CORS
const allowedCors = [
  'http://mike.nomoredomains.rocks',
  'https://mike.nomoredomains.rocks',
  'localhost:3000'
]

app.use(function(req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers['access-control-request-headers'];

  if(allowedCors.includes(origin)){
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if(method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});


// db connect
mongoose.connect(mongoUrl, mongoConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
        .pattern(new RegExp(/^[A-Za-z0-9]{8,30}$/)),
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

app.use(errors());
app.use(errorHandler);

// app.use(express.static('public'));
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер на порту ${PORT}`);
});
