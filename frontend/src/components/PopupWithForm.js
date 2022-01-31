import React from "react";

export default function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  children,
  buttonSubmitText,
  onSubmit,
  submitTextButton
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__wrap">
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            className="popup__save-button"
            type="submit"
            value="Сохранить"
          >
            {buttonSubmitText}
          </button>
        </form>
        <button
          onClick={onClose}
          className="popup__exit-button link"
          type="button"
          value="exit"
        ></button>
      </div>
    </div>
  );
}
