class AuthApi {
  constructor(options) {
    this._options = options;
  }

  register(email, password) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({ email, password }),
    }).then(this._getResponseData);
  }

  authorize(email, password) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({ email, password }),
    }).then(this._getResponseData);
  }

  checkToken(token) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: { ...this._options.headers, Authorization: `Bearer ${token}` },
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
const api = new AuthApi({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
