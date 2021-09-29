import { mainApiBaseUrl } from './constants.js';

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка: ${result.status}`);
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
      // credentials: 'include',
    })
    .then((res) => {
      return this._checkResponse(res);
    });
  }

  createMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      // credentials: 'include',
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
    .then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
      // credentials: 'include',
    })
    .then((res) => {
      return this._checkResponse(res);
    });
  }
}

const mainApi = new MainApi({
  baseUrl: mainApiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;