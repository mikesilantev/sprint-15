const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if(!token) {
    throw new UnauthorizedError('Необходима авторизация');
  } else {
    let payload;
    try {
      payload = jwt.verify(token, NODE_ENV !== 'production' ? JWT_SECRET : 'dev-secret');
    } catch (err) {
      next(new UnauthorizedError('Необходима авторизация'));
    }
    req.user = payload;
    next();
  }
};

// const jwt = require('jsonwebtoken');
// const UnauthorizedError = require('../errors/unauthorized-err');

// const { NODE_ENV, JWT_SECRET } = process.env;

// const extractBearerToken = (header) => header.replace('Bearer ', '');

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     throw new UnauthorizedError('Необходима авторизация');
//   }

//   const token = extractBearerToken(authorization);
//   let payload;

//   try {
//     payload = jwt.verify(token, NODE_ENV !== 'production' ? JWT_SECRET : 'dev-secret');
//   } catch (err) {
//     throw new UnauthorizedError('Необходима авторизация');
//   }

//   req.user = payload;
//   next();
// };
