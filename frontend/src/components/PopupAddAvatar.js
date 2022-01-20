import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function PopupAddAvatar({ isOpen, onClose, onUpdateAvatar, submitTextPopup}){

  const avatarInputRef = useRef('');
  
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarInputRef.current})
    }


  return(
    <PopupWithForm
    name="reloadAvatar"
    title="Обновить аватар"
    buttonSubmitText={submitTextPopup}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    >
    <input
      ref={avatarInputRef}
      id="popup__input-avatar"
      className="popup__input popup__input_avatar_url"
      type="url"
      name="avatar"
      placeholder="Ссылка на картинку"
      required
    />
    <span className="popup__error popup__input-avatar-error"></span>
    </PopupWithForm>
  );
}