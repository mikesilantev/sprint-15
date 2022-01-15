import React from "react";
export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card.link ? 'popup_open' : ''}`}>
      <div className="popup__wrap">
        <button
          className="popup__exit-button link"
          type="button"
          value="exit"
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <h3 className="popup__subtitle">{card.name}</h3>
      </div>
    </div>
  );
}
