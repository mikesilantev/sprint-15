import React from "react";

export default function InfoToolTip({name, isOpen, onClose, infoText}){


  return (
    <div className={`popup popup_type_info ${isOpen ? "popup_open" : ""}`}>
    <div className="popup__wrap">
      <div className="popup__info">
        <div className={`popup__info-${name}-img`}></div>
        <h3 className="popup__info-title">{infoText}</h3>
      </div>
      <button
        onClick={onClose}
        className="popup__exit-button popup__exit-button_info link"
        type="button"
        value="exit"
      ></button>
    </div>
  </div>
  )
}