import React, { useEffect, useState } from "react";

import PopupWithForm from "./PopupWithForm";
import { Popup } from "../utils/const";

const AddPlacePopup = (props) => {
  const { isOpen, onClose, onAddPlaceSubmit } = props;

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  const handleNameChange = (evt) => setName(evt.target.value);
  const handleLinkChange = (evt) => setLink(evt.target.value);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlaceSubmit({ name, link });
  };

  return (
    <PopupWithForm
      name={Popup.ADD_PLACE}
      title="Новое место"
      buttonTitle="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <label className="popup__form-label" htmlFor="title">
          Название
        </label>
        <input
          className="popup__form-input"
          type="text"
          name="title"
          value={name}
          onChange={handleNameChange}
          id="title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__error title-error" />
      </div>
      <div className="popup__input-container">
        <label className="popup__form-label" htmlFor="imageUrl">
          Ссылка на картинку
        </label>
        <input
          className="popup__form-input"
          type="url"
          name="imageUrl"
          value={link}
          onChange={handleLinkChange}
          id="imageUrl"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__error imageUrl-error" />
      </div>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
