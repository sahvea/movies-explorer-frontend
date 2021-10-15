import React from 'react';
import { useLocation } from 'react-router-dom';

import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterShortMovies } from '../../utils/utils';
import { infoMessages } from '../../utils/constants';

function Movies(props) {
  const location = useLocation();
  const [shortMovies, setShortMovies] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [isSearchResponse, setIsSearchResponse] = React.useState(false);
  const [searchMessage, setSearchMessage] = React.useState('');

  React.useEffect(() => {
    if (isChecked) {
      setShortMovies(filterShortMovies(props.movies));
    }
  }, [isChecked, props]);

  React.useEffect(() => {
    if (location.pathname === '/movies' && !props.isSearched && props.movies.length === 0) {
      setIsSearchResponse(true);
      setSearchMessage(infoMessages.searchResponseEmpty);
    } else if (location.pathname === '/saved-movies' && !props.isSearched && props.movies.length === 0) {
      setIsSearchResponse(true);
      setSearchMessage(infoMessages.searchResponseNoSavedMovies);
    } else if (props.isSearched && props.movies.length === 0) {
      setIsSearchResponse(true);
      setSearchMessage(infoMessages.searchResponseNotFound);
    } else if (!props.isSearched && shortMovies.length === 0 && isChecked) {
      setIsSearchResponse(true);
      setSearchMessage(infoMessages.searchResponseNotFound);
    } else if (props.isSearched && shortMovies.length === 0 && isChecked) {
      setIsSearchResponse(true);
      setSearchMessage(infoMessages.searchResponseNotFound);
    }

    return () => {
      setIsSearchResponse(false);
    }
  }, [isChecked, location.pathname, props.isSearched, props.movies.length, shortMovies.length]);

  return (
    <>
      <Header loggedIn={props.loggedIn} onThemeChange={props.onThemeChange} />
      <main className="movies">
        <SearchForm
          onMoviesSearch={props.onMoviesSearch}
          setIsChecked={setIsChecked}
          isLoading={props.isLoading}
          setPreloader={props.setPreloader}
        />

        {isSearchResponse
          ? <p className="movies__search-message">{searchMessage}</p>
          :
          <MoviesCardList
            movies={isChecked ? shortMovies : props.movies}
            onMovieSave={props.onMovieSave}
            onMovieDelete={props.onMovieDelete}
            isSearched={props.isSearched}
            isLoading={props.isLoading}
          />
        }
      </main>
      <Footer isLoading={props.isLoading}/>
    </>
  )
}

export default Movies;