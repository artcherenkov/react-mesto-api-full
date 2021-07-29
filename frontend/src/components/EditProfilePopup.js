import React, { useContext, useEffect, useState } from "react";

import PopupWithForm from "./PopupWithForm";
import { Popup } from "../utils/const";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = (props) => {
  const { isOpen, onClose, onProfileChange } = props;
  const userInfo = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (evt) => setName(evt.target.value);
  const handleDescriptionChange = (evt) => setDescription(evt.target.value);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onProfileChange({ name, about: description });
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setDescription(userInfo.about);
    }
  }, [userInfo, isOpen]);

  return (
    <PopupWithForm
      name={Popup.EDIT_PROFILE}
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <label className="popup__form-label" htmlFor="name">
          Ваше имя
        </label>
        <input
          className="popup__form-input"
          type="text"
          value={name}
          onChange={handleNameChange}
          name="name"
          id="name"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__error name-error" />
      </div>
      <div className="popup__input-container">
        <label className="popup__form-label" htmlFor="info">
          О вас
        </label>
        <input
          className="popup__form-input"
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          name="info"
          id="info"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__error info-error" />
      </div>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
