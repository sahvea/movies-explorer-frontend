import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList movies={props.movies}/>
    </main>
  )
}

export default Movies;