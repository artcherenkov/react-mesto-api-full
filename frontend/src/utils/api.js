class Api {
  constructor(options) {
    this._options = options;
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._options.headers,
    }).then(this._getResponseData);
  }

  editUserInfo(newUserInfo) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify(newUserInfo),
    }).then(this._getResponseData);
  }

  changeAvatar(avatarUrl) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({ avatar: avatarUrl }),
    }).then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      credentials: 'include',
      headers: this._options.headers,
    }).then(this._getResponseData);
  }

  changeLikeStatus(cardId, shouldSetLike) {
    return fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      credentials: 'include',
      method: shouldSetLike ? "put" : "delete",
      headers: this._options.headers,
    }).then(this._getResponseData);
  }

  postCard(card) {
    return fetch(`${this._options.baseUrl}/cards/`, {
      credentials: 'include',
      method: "post",
      headers: this._options.headers,
      body: JSON.stringify(card),
    }).then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      credentials: 'include',
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
  baseUrl: "http://localhost:3031",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
