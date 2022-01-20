const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');



module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  const { NODE_ENV, JWT_SECRET } = procces.env;

  if(!token) {
    throw new UnauthorizedError('Необходима авторизация!');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
    req.user = payload;
    next();
  } catch(err) {
    throw new UnauthorizedError('Необходима авторизация!');
  }
};


// const extractBearerToken = (header) => header.replace('Bearer ', '');
// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     throw new UnauthorizedError('Необходима авторизация');
//   }

//   const token = extractBearerToken(authorization);
//   let payload;

//   try {
//     payload = jwt.verify(token, 'super-strong-secret');
//   } catch (err) {
//     throw new UnauthorizedError('Необходима авторизация');
//   }

//   req.user = payload;
//   next();
// };
