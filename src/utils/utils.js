export function filterMovies(movies, keyword, isChecked) {
  const lowerCaseKeyword = keyword.toLowerCase();
  const maxMovieDuration = 40;

  const result = movies.filter(movie =>
    movie.nameRU.toLowerCase().includes(lowerCaseKeyword) ||
    movie.nameEN.toLowerCase().includes(lowerCaseKeyword) ||
    movie.description.toLowerCase().includes(lowerCaseKeyword) ||
    movie.director.toLowerCase().includes(lowerCaseKeyword) ||
    movie.country.toLowerCase().includes(lowerCaseKeyword) ||
    movie.year.toLowerCase().includes(lowerCaseKeyword)
  )

  if (isChecked) {
    result.filter(movie => movie.duration <= maxMovieDuration);
  }

  return result;
}