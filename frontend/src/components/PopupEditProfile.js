import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function PopupEditProfile({ isOpen, onClose, onUpdateUser, submitTextPopup}) {
  
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState({value: ''});
  const [description, setDescription] = useState({value: ''});

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e){
    setName(e.target.value);
  }
  function handleChangeDescription(e){
    setDescription(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonSubmitText={submitTextPopup}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
    <input
      id="popup__input-name"
      className="popup__input popup__input_text_name"
      type="text"
      name="name"
      required
      minLength="2"
      maxLength="30"
      placeholder="Имя"
      value={name || ''}
      onChange={handleChangeName}
    />
    <span className="popup__error popup__input-name-error"></span>
    <input
      id="popup__input-job"
      className="popup__input popup__input_text_job"
      type="text"
      name="about"
      required
      minLength="2"
      maxLength="200"
      value={description || ''}
      placeholder='Занятие'
      onChange={handleChangeDescription}
    />
    <span className="popup__input-job-error popup__error"></span>
    </PopupWithForm>
  );
}
