import { mainApiBaseUrl } from './constants.js';

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
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        thumbnail: movie.thumbnail,
        // owner: movie.owner,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
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

  // changeMovieStatus(movie, movieId, isSaved) {
  //   if (isSaved) {
  //     return this.deleteMovie(movieId);
  //   } else {
  //     return this.createMovie(movie);
  //   }
  // }
}

const mainApi = new MainApi({
  baseUrl: mainApiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include'
});

export default mainApi;