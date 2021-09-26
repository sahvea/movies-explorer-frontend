import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm() {
  function handleSubmit(e) {
    e.preventDefault();

  }

  return (
    <section className="search">
      <form className="search__form" name="search-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="search__film-info">
          <div className="search__input-wrap">
            <input type="text" name="movie" className="search__form-input" placeholder="Фильм" required />
            <button className="app__button search__form-btn" type="submit" aria-label="Поиск" title="Поиск"/>
          </div>
          <FilterCheckbox labelClass={'search__checkbox'} />
        </fieldset>
      </form>
    </section>
  )
}

export default SearchForm;