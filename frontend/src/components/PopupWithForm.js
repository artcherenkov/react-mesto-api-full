import React from "react";

const PopupWithForm = (props) => {
  const { name, title, buttonTitle, isOpen, children, onClose, onSubmit } =
    props;
  return (
    <div
      className={`popup popup_action_${name} main__popup ${
        isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button button"
          type="button"
          aria-label="Закрыть редактирование профиля"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button
            className="popup__form-submit button button_action_save"
            type="submit"
          >
            {buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
