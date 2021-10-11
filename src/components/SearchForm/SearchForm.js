import React from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import { useFormValidation } from '../../hooks/useFormValidation';

function SearchForm(props) {
  const [isShortMovie, setIsShortMovie] = React.useState(false);
  const { values, isValid, handleChange } = useFormValidation({
    movie: ''
  });
  const isSubmitDisabled = values.movie === '' || !isValid;

  function handleCheckboxClick() {
    setIsShortMovie(!isShortMovie)
    props.setIsChecked(!isShortMovie);
  };

  function handleSubmit(e) {
    e.preventDefault();

    props.onMoviesSearch(values.movie);
  }

  return (
    <section className="search">
      <form className="search__form" name="search-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="search__film-info" disabled={props.isLoading}>
          <div className="search__input-wrap">
            <input type="search" name="movie" required
              autoComplete="off"
              className="search__form-input"
              placeholder="Фильм"
              onChange={handleChange}
              value={values.movie}
            />
            <button className="app__button search__form-btn" type="submit" aria-label="Поиск" title="Поиск" disabled={isSubmitDisabled} />
          </div>
          <FilterCheckbox
            labelClass={'search__checkbox'}
            labelText={'Короткометражки'}
            isChecked={isShortMovie}
            onCheckboxChange={handleCheckboxClick}
          />
        </fieldset>
      </form>
    </section>
  )
}

export default SearchForm;