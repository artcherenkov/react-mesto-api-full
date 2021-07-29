import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((l) => l._id === currentUser._id);

  const activeLikeClassname = "place__like-button_active";

  return (
    <li className="places__item place">
      {isOwn && (
        <button
          className="place__delete-button button"
          onClick={onCardDelete}
        />
      )}
      <img
        className="place__image"
        src={card.link}
        alt={card.name}
        onClick={onCardClick}
      />
      <div className="place__content">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-container">
          <button
            className={`place__like-button button button_action_like ${
              isLiked && activeLikeClassname
            }`}
            type="button"
            aria-label="Убрать лайк"
            onClick={onCardLike}
          />
          <span className="place__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;
