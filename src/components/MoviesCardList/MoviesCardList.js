import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import initialMovies from '../../utils/movies';

function MoviesCardList() {
  return (
    <section className="card-list">
      {initialMovies.map((movie, index) => (
         <MoviesCard movie={movie} key={index} />
        ))}
    </section>
  );
}

export default MoviesCardList;