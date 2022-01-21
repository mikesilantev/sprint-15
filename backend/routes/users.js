const router = require('express').Router();
const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');

const {
  getUsers,
  getUsersById,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get(
  '/users/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required().hex().length(24),
    }),
  }),
  getUsersById,
);

router.patch(
  '/users/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUserProfile,
);

router.patch(
  '/users/me/avatar',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string().required()
        .regex(/https?:\/\/[-a-zA-Z0-9+-._~:/?#[\]@!$'()*+,;=&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9++-._~:/?#[\]@!$'()*+,;=&/=]*)?/i),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
