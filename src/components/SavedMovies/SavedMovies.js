import React from 'react';
import '../Movies/Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterShortMovies } from '../../utils/utils';

function SavedMovies(props) {
  const [shortMovies, setShortMovies] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(() => {
    if (isChecked) {
      setShortMovies(filterShortMovies(props.movies));
    }
  }, [isChecked, props]);

  return (
    <>
      <Header loggedIn={props.loggedIn} onThemeChange={props.onThemeChange} />
      <main className="movies movies_position_saved">
        <SearchForm onMoviesSearch={props.onMoviesSearch} setIsChecked={setIsChecked} isLoading={props.isLoading} />
        <MoviesCardList
          movies={isChecked ? shortMovies : props.movies}
          onMovieDelete={props.onMovieDelete}
          isLoading={props.isLoading}
        />
      </main>
      <Footer isLoading={props.isLoading}/>
    </>
  )
}

export default SavedMovies;