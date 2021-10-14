import { API_URL, movieDataOptions, MAX_MOVIE_DURATION } from './constants' ;

export function parseMovies(movies) {
  return movies.map(movie => ({
    country: movie.country || movieDataOptions.noData,
    director: movie.director || movieDataOptions.noData,
    duration: movie.duration || movieDataOptions.noDuration,
    year: movie.year || movieDataOptions.noData,
    description: movie.description || movieDataOptions.noData,
    image: `${API_URL}${movie.image.url}` || movieDataOptions.noImg,
    trailer: movie.trailerLink || movieDataOptions.noTrailer,
    thumbnail: `${API_URL}${movie.image.formats.thumbnail.url}` || movieDataOptions.noImg,
    nameRU: movie.nameRU || movieDataOptions.noData,
    nameEN: movie.nameEN || movieDataOptions.noData,
    movieId: movie.id,
  }));
}

export function filterMovies(movies, keyword) {
  const lowerCaseKeyword = keyword.toLowerCase();

  const result = movies.filter(movie => {
    return (
      movie.nameRU.toLowerCase().includes(lowerCaseKeyword) ||
      (movie.nameEN && movie.nameEN.toLowerCase().includes(lowerCaseKeyword)) ||
      movie.description.toLowerCase().includes(lowerCaseKeyword) ||
      (movie.director && movie.director.toLowerCase().includes(lowerCaseKeyword)) ||
      (movie.country && movie.country.toLowerCase().includes(lowerCaseKeyword)) ||
      movie.year.toLowerCase().includes(lowerCaseKeyword)
    );
  });

  return result;
}

export function filterShortMovies(movies) {
  const shortMoviesArray = movies.filter(movie => movie.duration <= MAX_MOVIE_DURATION);
  return shortMoviesArray;
}

export function convertTime(num) {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
}