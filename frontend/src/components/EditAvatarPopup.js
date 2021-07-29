import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { Popup } from "../utils/const";

const EditAvatarPopup = (props) => {
  const { onClose, isOpen, onAvatarChange } = props;

  const avatarRef = useRef(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAvatarChange(avatarRef.current.value).then(
      () => (avatarRef.current.value = "")
    );
  };

  return (
    <PopupWithForm
      name={Popup.CHANGE_AVATAR}
      title="Обновить аватар"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <label className="popup__form-label" htmlFor="avatarUrl">
          Ваше имя
        </label>
        <input
          className="popup__form-input"
          type="url"
          name="avatarUrl"
          id="avatarUrl"
          placeholder="Ссылка на изображение"
          defaultValue=""
          ref={avatarRef}
          required
        />
        <span className="popup__error avatarUrl-error" />
      </div>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
