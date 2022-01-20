import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function PopupAddCard({ isOpen, onClose, onAddPlace,submitTextPopup }) {

  const [ place, setPlace ] = useState('');
  const [ placeLink, setPlaceLink ] = useState('');


  function handleSetPlace(e){
    setPlace(e.target.value);
    // console.log(place)
  }

  function handleSetPlaceLink(e){
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    onAddPlace({
      name: place, 
      link: placeLink
    })
  }
  useEffect(() => {
    setPlace('');
    setPlaceLink('');
  }, [isOpen])

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonSubmitText={submitTextPopup}
      isOpen={isOpen}
      onClose={onClose}
      onAddPlace={onAddPlace}
      onSubmit={handleSubmit}
    >
      <input
        id="popup__input-location"
        className="popup__input popup__input_text_loc-name"
        type="text"
        name="name"
        placeholder="Имя карточки"
        required
        minLength="2"
        maxLength="30"
        onChange={handleSetPlace}
        value={place || ''}
      />

      <span className="popup__error popup__input-location-error"></span>

      <input
        onChange={handleSetPlaceLink}
        id="popup__input-url"
        className="popup__input popup__input_text_url"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={placeLink || ''}
      />

      <span className="popup__error popup__input-url-error"></span>
    </PopupWithForm>

  )

}