import '../Movies/Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  return (
    <main className="movies movies_position_saved">
      <SearchForm />
      <MoviesCardList movies={props.movies} />
    </main>
  )
}

export default SavedMovies;