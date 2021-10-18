import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { windowSizes, cardsNumbers, nextCardsNumbers } from '../../utils/constants';

function MoviesCardList(props) {
  const location = useLocation();
  const [cardsToShow, setCardsToShow] = React.useState([]);
  const [cardsPerPage, setCardsPerPage] = React.useState(0);
  const [nextCards, setNextCards] = React.useState(0);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  function checkWindowWidth() {
    setTimeout(() => setWindowWidth(window.innerWidth), 500);
  };

  React.useEffect(() => {
    window.addEventListener('resize', checkWindowWidth);

    if (windowWidth > windowSizes.desktop) {
      setCardsPerPage(cardsNumbers.desktop);
      setNextCards(nextCardsNumbers.desktop);
    } else if (windowWidth > windowSizes.mobile && windowWidth <= windowSizes.desktop) {
      setCardsPerPage(cardsNumbers.tablet);
      setNextCards(nextCardsNumbers.tablet);
    } else if (windowWidth <= windowSizes.mobile) {
      setCardsPerPage(cardsNumbers.mobile);
      setNextCards(nextCardsNumbers.mobile);
    }

    return () => window.removeEventListener('resize', checkWindowWidth);
  }, [windowWidth]);

  React.useEffect(() => {
    if (location.pathname === '/movies') {
      setCardsToShow(props.movies.slice(0, cardsPerPage));
    } else {
      setCardsToShow(props.movies);
    }
  }, [cardsPerPage, location.pathname, props.movies]);

  function handleShowMoreCards() {
    setCardsToShow(props.movies.slice(0, cardsToShow.length + nextCards));
  };

  return (
    props.isLoading ?
      <Preloader />
    :
    <section className="card-list">
      <ul className="card-list__list">
        {cardsToShow.map(movie => (
          <li className="card-list__list-item" key={movie.movieId || movie._id}>
            <MoviesCard
              movie={movie}
              onMovieSave={props.onMovieSave}
              onMovieDelete={props.onMovieDelete}
            />
          </li>
        ))}
      </ul>
      {location.pathname === '/movies' && props.movies.length > cardsToShow.length &&
        <button className="app__button card-list__more-btn" onClick={handleShowMoreCards} type="button">Ещё</button>
      }
    </section>
  );
}

export default MoviesCardList;