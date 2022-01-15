import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__wrap">
          <span className="test">
            <button
              onClick={onEditAvatar}
              type="button"
              className="profile__avatar-button"
              value="edit"
            ></button>
            <img
              src={currentUser.avatar}
              alt="Загрузите аватар"
              className="profile__avatar"
            />
          </span>

          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              type="button"
              className="profile__edit-button link"
              value="edit"
            ></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__add-button link"
          value="add"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
