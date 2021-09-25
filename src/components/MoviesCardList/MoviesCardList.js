
import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import initialMovies from '../../utils/movies';

function MoviesCardList() {
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

      if (initialMovies.length <= cardsPerPage) {
        setIsShowMoreBtnVisible(false);
      }
    }
  }, [cardsPerPage, location.pathname]);

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
    setCardsToShow(initialMovies.slice(start, end));
  };


  function handleShowMoreCards() {
    showCards(0, cardsToShow.length + nextCards)
    checkBntState();
  };

  /* TODO: разобраться с состоянием, подобрать нужное условие */
  function checkBntState() {
    if (cardsToShow.lenght >= initialMovies.length - nextCards) {
      console.log('!');
      setIsShowMoreBtnVisible(false);
    }
  }

  return (
    <section className="card-list">
      <ul className="card-list__list">
      {cardsToShow.map((movie, index) => (
        <li key={index}>
          <MoviesCard movie={movie} />
        </li>
        ))}
      </ul>
      {location.pathname === '/movies' && isShowMoreBtnVisible &&
        <button className="app__button card-list__more-btn" onClick={handleShowMoreCards} type="button">Ещё</button>
      }
    </section>
  );
}

export default MoviesCardList;