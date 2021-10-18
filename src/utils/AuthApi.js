import { MAIN_API_URL } from './constants.js';

class AuthApi {
  constructor({ baseUrl, headers, credentials }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({ email, password, name })
    })
    .then((res) => this._checkResponse(res));
  };

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({ email, password }),
    })
    .then((res) => this._checkResponse(res));
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'DELETE',
      credentials: this._credentials,
    })
    .then((res) => this._checkResponse(res));
  }
}

const authApi = new AuthApi({
  baseUrl: MAIN_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include'
});

export default authApi;