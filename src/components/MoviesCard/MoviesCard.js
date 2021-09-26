import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard(props) {
  const location = useLocation();
  const [savedMovie, setSavedMovie] = React.useState(false);

  const isMovieSaved = `${location.pathname === '/movies' && savedMovie ? "movie-card__button_saved" : ""}`

  const buttonClassName = `app__button movie-card__button ${
    location.pathname === '/movies'
      ? "movie-card__button_action_save"
      : "movie-card__button_action_delete"
  } ${isMovieSaved}`;

  const buttonLabel = location.pathname === '/movies' && !isMovieSaved
    ? "Сохранить"
    : "Удалить";

  React.useEffect(() => {
    if (location.pathname === '/movies' && props.movie.saved) {
      setSavedMovie(true);
    }
  }, [setSavedMovie, location, props]);

  function handleBtnClick(e) {
    if (location.pathname === '/movies' && !savedMovie) {
      setSavedMovie(true);
    } else {
      setSavedMovie(false);
    }

    if (location.pathname === '/saved-movies') {
      const card = e.target.closest('.card-list__list-item');
      card.remove();
    }
  }

  return (
    <article className="movie-card">
      <div className="movie-card__info-wrap">
        <p className="movie-card__title">{props.movie.nameRu}</p>
        <p className="movie-card__duration">{props.movie.duration}</p>
        <button className={buttonClassName} aria-label={buttonLabel} title={buttonLabel} onClick={handleBtnClick}></button>
      </div>
      <a className="movie-card__trailer-link" href={props.movie.trailerLink} target="_blank" rel="noreferrer">
        <img className="movie-card__image" src={props.movie.image} alt={props.movie.nameRu} />
      </a>
    </article>
  );
}

export default MoviesCard;