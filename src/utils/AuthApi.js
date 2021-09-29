import { mainApiBaseUrl } from './constants.js';

class AuthApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}. ${res.message}`);
  }

  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      // credentials: 'include',
      body: JSON.stringify({ email, password, name })
    })
      .then((res) => this._checkResponse(res));
  };

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      // credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
      .then((res) => this._checkResponse(res));
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      // credentials: 'include',
    })
    .then((res) => this._checkResponse(res));
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'DELETE',
      // credentials: 'include',
    })
    .then((res) => this._checkResponse(res));
  }
}

const authApi = new AuthApi({
  baseUrl: mainApiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default authApi;