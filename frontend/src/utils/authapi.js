class AuthApi {
  constructor(options) {
    this._options = options;
  }

  register(email, password) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: "POST",
      credentials: 'include',
      headers: this._options.headers,
      body: JSON.stringify({ email, password }),
    }).then(this._getResponseData);
  }

  authorize(email, password) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: this._options.headers,
      body: JSON.stringify({ email, password }),
    }).then(this._getResponseData);
  }

  checkToken() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      credentials: 'include',
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
const api = new AuthApi({
  baseUrl: "https://api.ypmesto.ru",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
