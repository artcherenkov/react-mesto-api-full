class Api {
  constructor(options) {
    this._options = options;
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    }).then(this._getResponseData);
  }

  editUserInfo(newUserInfo) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify(newUserInfo),
    }).then(this._getResponseData);
  }

  changeAvatar(avatarUrl) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({ avatar: avatarUrl }),
    }).then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    }).then(this._getResponseData);
  }

  changeLikeStatus(cardId, shouldSetLike) {
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: shouldSetLike ? "put" : "delete",
      headers: this._options.headers,
    }).then(this._getResponseData);
  }

  postCard(card) {
    return fetch(`${this._options.baseUrl}/cards/`, {
      method: "post",
      headers: this._options.headers,
      body: JSON.stringify(card),
    }).then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: "delete",
      headers: this._options.headers,
    }).then(this._getResponseData);
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

// Инициализация API
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-23",
  headers: {
    authorization: "5a89c943-0743-4e83-b516-7727da7c758b",
    "Content-Type": "application/json",
  },
});

export default api;
