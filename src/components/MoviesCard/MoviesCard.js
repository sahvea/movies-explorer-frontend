import React from 'react';
import { useLocation } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './MoviesCard.css';

function MoviesCard(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const location = useLocation();
  const [isActiveClass, setActiveClass] = React.useState(false);

  const movieDuration = timeConvert(props.movie.duration);
  const isMovieSaved = `${location.pathname === '/movies' && isActiveClass
    ? "movie-card__button_saved"
    : ""
  }`
  const buttonClassName = `app__button movie-card__button ${
    location.pathname === '/movies'
      ? "movie-card__button_action_save"
      : "movie-card__button_action_delete"
  } ${isMovieSaved}`;
  const buttonLabel = location.pathname === '/movies' && !isMovieSaved
    ? "Сохранить"
    : "Удалить";

  // React.useEffect(() => {
  //   const savedMoviesList = props.savedMovies.some((m) => {
  //     return m.movieId === props.movie.movieId && m.owner === currentUser._id;
  //   });

  //   if (location.pathname === '/movies' && savedMoviesList) {
  //     setSavedMovie(true);
  //   }
  // }, [setSavedMovie, location, props, currentUser._id]);

  function handleBtnClick() {
    if (location.pathname === '/movies') {
      if (!isActiveClass) {
        handleSaveClick();
      } else {
        handleDeleteClick();
      }
    } else {
      handleDeleteClick();
    }

    checkIsMovieSaved(props.movie);
  }

  function handleSaveClick() {
    props.onMovieSave(props.movie);
  }

  function handleDeleteClick() {
    props.onMovieDelete(props.movie);
  }

  function checkIsMovieSaved(movie) {
    const savedMovie = props.savedMovies.some((m) => m.movieId === movie.movieId && m.owner === currentUser._id);
    if (!savedMovie) {
      setActiveClass(true);
    } else {
      setActiveClass(false);
    }
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