import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete}) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDelete(card)
  }
// /element__trash_disable
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__trash link ${
    isOwn ? "element__trash_active" : "element__trash_disable"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  return (
    <article className="element">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        value="trash"
        onClick={handleDelete}
      ></button>
      <img
        onClick={handleClick}
        src={card.link}
        alt="Новая картинка"
        className="element__image"
      />
      <div className="element__text-wrap">
        <h3 className="element__title">{card.name}</h3>
        <div className="element__like-wrap">
          <button
            type="button"
            className={cardLikeButtonClassName}
            value="like"
            onClick={handleLike}
          ></button>
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}
