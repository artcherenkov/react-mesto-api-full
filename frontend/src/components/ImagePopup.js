import React from "react";

const ImagePopup = (props) => {
  const { card, onClose } = props;

  if (!card) {
    return null;
  }

  return (
    <div
      className={`popup ${
        card && "popup_opened"
      } popup_type_fullscreen-image popup_action_add-place main__popup`}
    >
      <figure className="popup__image-container">
        <button
          className="popup__close-button button"
          type="button"
          aria-label="Закрыть изображение"
          onClick={onClose}
        />
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__image-caption">{card.name}</figcaption>
      </figure>
    </div>
  );
};

export default ImagePopup;
