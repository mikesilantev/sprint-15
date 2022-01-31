// Cards controllers

const Card = require('../models/card');
// errors
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bed-request-err');
const ForbiddenError = require('../errors/forbidden-err');

// Ready
// Get all cards
const getCards = (req, res, next) => Card.find({})
  .then((cards) => {
    res.status(200).send(cards);
    console.log(cards);
  })
  .catch(next);

// Ready
// Create card
const createCards = (req, res, next) => {
  const { name, link } = req.body;
  // console.log('>line: 20 - name: ' + name);
  // console.log('>line: 22 - link: ' + link);
  const ownerId = req.user._id;
  // console.log('>line: 24 - ownerID: ' + ownerId);

  Card.create({ name, link, owner: ownerId })
    // .then((card) => res.send({ data: card }))
    .then((card) => {
      res.send(card);
      // console.log(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

const deleteCards = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)

    .orFail(() => {
      throw new NotFoundError('Карточка с указанным _id не найдена.');
    })

    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError('Вы пытаетесь удалить чужую карточку'));
      } else {
        Card.findByIdAndRemove(cardId)
          .then((removeCard) => {
            res.status(200).send(removeCard);
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан несуществующий _id карточки'));
      } else {
        next(err);
      }
    });
};

// Put a like on the card
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Передан несуществующий _id карточки.');
    })
    .then((like) => {
      res.status(200).send(like);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      } else {
        next(err);
      }
    });
};

// Dislike
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Передан несуществующий _id карточки.');
    })
    .then((like) => {
      res.status(200).send(like);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для снятии лайка'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCards,
  deleteCards,
  likeCard,
  dislikeCard,
};
