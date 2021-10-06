import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard(props) {
  const location = useLocation();
  const [isMovieSaved, setIsMovieSaved] = React.useState(props.savedMovies.some((m) => m.movieId === props.movie.movieId));
  localStorage.setItem('savedMovies', JSON.stringify(props.savedMovies));

  const movieDuration = timeConvert(props.movie.duration);
  const movieBtnSavedClass = `${location.pathname === '/movies' && isMovieSaved
    ? "movie-card__button_saved"
    : ""
  }`
  const buttonClassName = `app__button movie-card__button ${
    location.pathname === '/movies'
      ? "movie-card__button_action_save"
      : "movie-card__button_action_delete"
  } ${movieBtnSavedClass}`;
  const buttonLabel = isMovieSaved ? "Удалить" : "Сохранить";

  // React.useEffect(() => {
  //   const savedMoviesList = props.savedMovies.some((m) => {
  //     return m.movieId === props.movie.movieId;
  //   });

  //   if (location.pathname === '/movies' && savedMoviesList) {
  //     setIsMovieSaved(true);
  //   }
  // }, [location, props]);

  React.useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    return savedMovies && savedMovies.some((m) => m.movieId === props.movie.movieId)
      ? setIsMovieSaved(true)
      : setIsMovieSaved(false);
  }, [props.movie.movieId]);

  function handleBtnClick() {
    if (isMovieSaved) {
      handleDeleteClick();
    } else {
      handleSaveClick();
    }
  }

  function handleSaveClick() {
    props.onMovieSave(props.movie);
    setIsMovieSaved(true);
  }

  function handleDeleteClick() {
    props.onMovieDelete(props.movie);
    setIsMovieSaved(false);
  }

  function timeConvert(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return hours + 'ч ' + minutes + 'м';
  }

  return (
    <article className="movie-card">
      <div className="movie-card__info-wrap">
        <p className="movie-card__title">{props.movie.nameRU}</p>
        <p className="movie-card__duration">{movieDuration}</p>
        <button className={buttonClassName} aria-label={buttonLabel} title={buttonLabel} onClick={handleBtnClick}></button>
      </div>
      <a className="movie-card__trailer-link" href={props.movie.trailer} target="_blank" rel="noreferrer">
        <img className="movie-card__image" src={props.movie.image} alt={props.movie.nameRU} />
      </a>
    </article>
  );
}

export default MoviesCard;