import { mainApiBaseUrl, movieDataOptions } from './constants.js';

class MainApi {
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

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: this._credentials,
    })
    .then((res) => this._checkResponse(res));
  }

  updateUserInfo({ email, name }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: `${name}`,
        email: `${email}`
      })
    })
    .then((res) => this._checkResponse(res));
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
      credentials: this._credentials,
    })
    .then((res) => this._checkResponse(res));
  }

  createMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        country: movie.country || movieDataOptions.noData,
        director: movie.director || movieDataOptions.noData,
        duration: movie.duration || movieDataOptions.noDuration,
        year: movie.year || movieDataOptions.noData,
        description: movie.description || movieDataOptions.noData,
        image: movie.image || movieDataOptions.noImg,
        trailer: movie.trailer || movieDataOptions.noTrailer,
        thumbnail: movie.thumbnail || movieDataOptions.noImg,
        movieId: movie.movieId,
        nameRU: movie.nameRU || movieDataOptions.noData,
        nameEN: movie.nameEN || movieDataOptions.noData,
      })
    })
    .then((res) => this._checkResponse(res));
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: this._credentials,
    })
    .then((res) => this._checkResponse(res));
  }
}

const mainApi = new MainApi({
  baseUrl: mainApiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include'
});

export default mainApi;