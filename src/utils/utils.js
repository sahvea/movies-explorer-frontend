import { apiUrl } from "./constants";

export function parseMovies(movies) {
  return movies.map(movie => ({
    ...movie,
    trailer: movie.trailerLink,
    image: `${apiUrl}${movie.image.url}`,
    thumbnail: `${apiUrl}${movie.image.formats.thumbnail.url}`,
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
  const maxMovieDuration = 40;

  const shortMoviesArray = movies.filter(movie => movie.duration <= maxMovieDuration);

  return shortMoviesArray;
}

export function convertTime(num) {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;

}