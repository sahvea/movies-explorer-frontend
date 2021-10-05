import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main className="movies">
        <SearchForm />
        <MoviesCardList
          movies={props.movies}
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