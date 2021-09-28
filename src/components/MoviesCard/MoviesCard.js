import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { apiUrl } from '../../utils/constants';

function MoviesCard(props) {
  const location = useLocation();
  const [savedMovie, setSavedMovie] = React.useState(false);
  const movieDuration = timeConvert(props.movie.duration);

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

  function timeConvert(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return hours + 'ч ' + minutes + 'м';
  }


  // console.log(props.movie.image.url);
  // console.log(`https://api.nomoreparties.co${props.movie.image.url}`);

  return (
    <article className="movie-card">
      <div className="movie-card__info-wrap">
        <p className="movie-card__title">{props.movie.nameRU}</p>
        <p className="movie-card__duration">{movieDuration}</p>
        <button className={buttonClassName} aria-label={buttonLabel} title={buttonLabel} onClick={handleBtnClick}></button>
      </div>
      <a className="movie-card__trailer-link" href={props.movie.trailerLink} target="_blank" rel="noreferrer">
        <img className="movie-card__image" src={`${apiUrl}${props.movie.image.url}`} alt={props.movie.nameRU} />
      </a>
    </article>
  );
}

export default MoviesCard;