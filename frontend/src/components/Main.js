import React, { useContext } from "react";
import Card from "./Card";
import Loader from "./Loader";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = (props) => {
  const {
    onEditProfileClick,
    onAddPlaceClick,
    onEditAvatarClick,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete,
    isLoading,
  } = props;

  const currentUser = useContext(CurrentUserContext);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="main root__main">
      <React.Fragment>
        <section className="profile main__profile">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватар пользователя"
            />
            <button
              className="profile__change-avatar"
              onClick={onEditAvatarClick}
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button button"
              type="button"
              aria-label="Изменить информацию о себе"
              onClick={onEditProfileClick}
            />
            <p className="profile__about">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-button button"
            type="button"
            aria-label="Добавить еще одно место"
            onClick={onAddPlaceClick}
          />
        </section>
        <section className="places main__places">
          <ul className="places__list">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick(card)}
                onCardLike={onCardLike(card)}
                onCardDelete={onCardDelete(card)}
              />
            ))}
          </ul>
        </section>
      </React.Fragment>
    </main>
  );
};

export default Main;
