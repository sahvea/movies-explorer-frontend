
import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  const location = useLocation();
  const [cardsToShow, setCardsToShow] = React.useState([]);
  const [cardsPerPage, setCardsPerPage] = React.useState(0);
  const [nextCards, setNextCards] = React.useState(0);
  const [isShowMoreBtnVisible, setIsShowMoreBtnVisible] = React.useState(true);

  React.useEffect(() => {
    changeCardsNumber();
  });

  React.useEffect(() => {
    if (location.pathname === '/movies') {
      showCards(0, cardsPerPage);

      if (props.movies.length <= cardsPerPage) {
        setIsShowMoreBtnVisible(false);
      }
    } else {
      setCardsToShow(props.movies);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsPerPage, location.pathname, props.movies]);

  function changeCardsNumber() {
    if (window.innerWidth > 768) {
      setCardsPerPage(12);
      setNextCards(3);
    } else if (window.innerWidth > 480 && window.innerWidth <= 768) {
      setCardsPerPage(8);
      setNextCards(2);
    } else if (window.innerWidth <= 480) {
      setCardsPerPage(5);
      setNextCards(1);
    }
  }

  function showCards(start, end) {
    setCardsToShow(props.movies.slice(start, end));
  };

  function handleShowMoreCards() {
    showCards(0, cardsToShow.length + nextCards)
    checkBntState();
  };

  /* TODO: разобраться с состоянием, подобрать нужное условие */
  function checkBntState() {
    if (cardsToShow.lenght >= props.movies.length - nextCards) {
      console.log('!');
      setIsShowMoreBtnVisible(false);
    }
  }

  return (
    props.isLoading ?
      <Preloader />
    :
    <section className="card-list">
      {props.movies.length === 0
          ? <p className="movies__search-message">Ничего не найдено.</p>
          :
      <ul className="card-list__list">
      {cardsToShow.map((movie) => (
        <li className="card-list__list-item" key={movie.id} >
          <MoviesCard
            movie={movie}
            savedMovies={props.savedMovies}
            onMovieSave={props.onMovieSave}
            onMovieDelete={props.onMovieDelete}
          />
        </li>
        ))}
      </ul>}
      {location.pathname === '/movies' && isShowMoreBtnVisible &&
        <button className="app__button card-list__more-btn" onClick={handleShowMoreCards} type="button">Ещё</button>
      }
    </section>
  );
}

export default MoviesCardList;