import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { Popup } from "../utils/const";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import authApi from "../utils/authapi";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { Tooltip } from "../utils/const";

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const [tooltip, setTooltip] = useState({ isOpen: false, tooltip: null });

  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState();
  const [cards, setCards] = useState(null);

  useEffect(() => {
    api
      .getUserInfo()
      .then(handleLogin)
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!loggedIn) return;

    setIsLoading(true);
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, currentUser]) => {
        setCards(cards.data);
        setCurrentUser(currentUser.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [loggedIn]);

  const handleError = () => {
    setTooltip({ isOpen: true, tooltip: Tooltip.ERROR });
  };
  const handleSuccess = () => {
    setTooltip({ isOpen: true, tooltip: Tooltip.SUCCESS });
  };

  const authorize = (email, password) => {
    authApi.authorize(email, password).then(handleLogin).catch(handleError);
  };
  const register = (email, password) => {
    authApi
      .register(email, password)
      .then(({ data }) => {
        setEmail(data.email);
        handleRegister();
        handleSuccess();
      })
      .catch(handleError);
  };
  const logout = () => {
    api.logout().then(handleSignOut).catch(handleError);
  };

  const handleRegister = () => {
    history.push("/sign-in");
  };
  const handleLogin = () => {
    setLoggedIn(true);
    history.push("/");
  };
  const handleSignOut = () => {
    setEmail("");
    setLoggedIn(false);
    history.push("/sign-in");
  };

  const handleCardLike = (card) => () => {
    const isLiked = card.likes.some((l) => l === currentUser._id);
    api
      .changeLikeStatus(card._id, !isLiked)
      .then(({ data }) => {
        setCards((prevState) =>
          prevState.map((c) => (c._id === card._id ? data : c))
        );
      })
      .catch((err) => console.log(err));
  };
  const handleCardDelete = (card) => () => {
    api
      .deleteCard(card._id)
      .then(() =>
        setCards((prevState) => prevState.filter((c) => c._id !== card._id))
      )
      .catch((err) => console.log(err));
  };

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };

  const handleCardClick = (card) => () => {
    setSelectedCard(card);
  };

  const handleProfileChange = (newUserInfo) => {
    api
      .editUserInfo(newUserInfo)
      .then(({ data }) => {
        setCurrentUser(data);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => console.log(err));
  };
  const handleAvatarChange = (avatarUrl) => {
    return api
      .changeAvatar(avatarUrl)
      .then(({ data }) => {
        setCurrentUser(data);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => console.log(err));
  };
  const handleAddPlaceSubmit = (newPlace) => {
    return api
      .postCard(newPlace)
      .then(({ data }) => {
        setCards((prevState) => [data, ...prevState]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} email={email} onSignOut={logout} />
      <Switch>
        <Route path="/sign-in">
          <Login onLogin={authorize} />
        </Route>
        <Route path="/sign-up">
          <Register onRegister={register} />
        </Route>
        <ProtectedRoute exact path="/" loggedIn={loggedIn}>
          <Main
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            selectedCard={selectedCard}
            isLoading={isLoading}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
          />
        </ProtectedRoute>
      </Switch>

      {/* Попап редактирования профиля  */}
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onProfileChange={handleProfileChange}
      />
      {/* Попап добавления места  */}
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlaceSubmit={handleAddPlaceSubmit}
      />
      {/* Попап подтверждения удаления */}
      <PopupWithForm
        name={Popup.SUBMIT_DELETION}
        title="Вы уверены?"
        isOpen={selectedCard}
        onClose={closeAllPopups}
      >
        <button className="popup__form-submit popup__form-submit_action_deletion button">
          Да
        </button>
      </PopupWithForm>

      {/* Попап изменения аватара */}
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onAvatarChange={handleAvatarChange}
      />
      {/* Попап полноэкранного изображения */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip
        tooltip={tooltip}
        onClose={() => setTooltip({ ...tooltip, isOpen: false })}
      />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
