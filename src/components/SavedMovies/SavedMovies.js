import '../Movies/Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="movies movies_position_saved">
        <SearchForm />
        <MoviesCardList
          movies={props.movies}
          savedMovies={props.savedMovies}
          onMovieDelete={props.onMovieDelete}
          isLoading={props.isLoading}
        />
      </main>
      <Footer isLoading={props.isLoading}/>
    </>
  )
}

export default SavedMovies;