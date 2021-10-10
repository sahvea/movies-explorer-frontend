import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterShortMovies } from '../../utils/utils';

function Movies(props) {
  const [shortMovies, setShortMovies] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(() => {
    if (isChecked) {
      setShortMovies(filterShortMovies(props.movies));
    }
  }, [isChecked, props]);

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="movies">
        <SearchForm onMoviesSearch={props.onMoviesSearch} setIsChecked={setIsChecked} isLoading={props.isLoading} />
        <MoviesCardList
          movies={isChecked ? shortMovies : props.movies}
          savedMovies={props.savedMovies}
          onMovieSave={props.onMovieSave}
          onMovieDelete={props.onMovieDelete}
          isLoading={props.isLoading}
        />
      </main>
      <Footer isLoading={props.isLoading}/>
    </>
  )
}

export default Movies;