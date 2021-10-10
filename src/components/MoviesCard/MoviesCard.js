import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { convertTime } from '../../utils/utils';

function MoviesCard(props) {
  const location = useLocation();
  const [isMovieSaved, setIsMovieSaved] = React.useState(false);

  // localStorage.setItem('savedMovies', JSON.stringify(props.savedMovies));

  const movieDuration = convertTime(props.movie.duration);
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

  React.useEffect(() => {
    // const movies = JSON.parse(localStorage.getItem('movies'));

    if (props.savedMovies.some(m => m.movieId === props.movie.movieId)) {
      setIsMovieSaved(true);
    }

    // return savedMovies && savedMovies.some(m => m.movieId === props.movie.movieId)
    //   ? setIsMovieSaved(true)
    //   : setIsMovieSaved(false);
  }, [props.movie.movieId, props.savedMovies]);

  function handleBtnClick() {
    isMovieSaved ? handleDeleteClick() : handleSaveClick();
  }

  function handleSaveClick() {
    props.onMovieSave(props.movie);
    setIsMovieSaved(true);
  }

  function handleDeleteClick() {
    props.onMovieDelete(props.movie);
    setIsMovieSaved(false);
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