const router = require('express').Router();
const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');

const {
  getCards,
  createCards,
  deleteCards,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// Get cards
router.get('/cards', getCards);

// Post card
router.post(
  '/cards',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2)
        .max(30),
      link: Joi.string().required().regex(
        /https?:\/\/[-a-zA-Z0-9+-._~:/?#[\]@!$'()*+,;=&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9++-._~:/?#[\]@!$'()*+,;=&/=]*)?/i,
      ),
    }),
  }),
  createCards,
);

// Delete card
router.delete(
  '/cards/:cardId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  deleteCards,
);

// Put like
router.put(
  '/cards/:cardId/likes',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  likeCard,
);

// Delete like
router.delete(
  '/cards/:cardId/likes',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  dislikeCard,
);

module.exports = router;
