import { moviesApiBaseUrl } from './constants';

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(this._baseUrl, {
      headers: this._headers
    })
    .then((res) => {
      return this._checkResponse(res);
    });
  }
}

const moviesApi = new MoviesApi({
  baseUrl: moviesApiBaseUrl,
  headers: {
    Authorization: '',
    'Content-Type': 'application/json'
  }
});

export default moviesApi;