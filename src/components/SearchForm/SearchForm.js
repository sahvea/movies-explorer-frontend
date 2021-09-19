import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search page__section">
      <form className="form search__form" name="search-form">
        <fieldset className="form__fieldset search__fieldset">
          <div className="search__input-wrap">
            <input type="text" name="movie" className="search__form-input" placeholder="Фильм" required />
            <button className="button search__form-btn" type="submit" ariaLabel="Поиск" title="Поиск"/>
          </div>
        </fieldset>
      </form>
    </section>
  )
}

export default SearchForm;