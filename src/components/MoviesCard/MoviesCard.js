import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { convertTime } from '../../utils/utils';

function MoviesCard(props) {
  const location = useLocation();
  const [isMovieSaved, setIsMovieSaved] = React.useState(false);

  const movieDuration = convertTime(props.movie.duration);
  const buttonLabel = isMovieSaved ? "Удалить" : "Сохранить";
  const movieBtnSavedClass = `${location.pathname === '/movies' && isMovieSaved
    ? "movie-card__button_saved"
    : ""
  }`;
  const buttonClassName = `app__button movie-card__button ${
    location.pathname === '/movies'
      ? "movie-card__button_action_save"
      : "movie-card__button_action_delete"
  } ${movieBtnSavedClass}`;

  React.useEffect(() => {
    const userMovie = JSON.parse(localStorage.getItem(`${props.movie.movieId}`));
    if (userMovie) {
      setIsMovieSaved(true);
    }
  }, [props.movie.movieId]);

  function handleBtnClick() {
    if (location.pathname === '/movies') {
      if (isMovieSaved) {
        const movieId = props.savedMovies.filter(m => m.movieId === props.movie.movieId
          || m.data?.movieId === props.movie.id)[0];

        handleDeleteClick(movieId._id);
      } else {
        handleSaveClick();
      }
    } else {
      handleDeleteClick(props.movie._id)
    }
  }

  function handleSaveClick() {
    props.onMovieSave(props.movie);
    setIsMovieSaved(true);
  }

  function handleDeleteClick(movieId) {
    props.onMovieDelete(movieId, props.movie);
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