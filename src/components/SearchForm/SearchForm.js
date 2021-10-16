import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { infoMessages } from '../../utils/constants';

function SearchForm(props) {
  const location = useLocation();
  const [isShortMovie, setIsShortMovie] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [validityError, setValidityError] = React.useState('');

  function handleCheckboxClick() {
    setIsShortMovie(!isShortMovie)
    props.setIsChecked(!isShortMovie);
  };

  function handleInputChange(e) {
    const input = e.target;
    const { value } = input;
    setInput(value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!input || /^\s+$/.test(input)) {
      setValidityError(infoMessages.searchInputEmpty);
    } else {
      props.onMoviesSearch(input);
      setValidityError('');
      props.setPreloader(true);
    }
  }

  React.useEffect(() => {
    setValidityError('');
    setInput('');
  }, [location]);

  return (
    <section className="search">
      <form className="search__form" name="search-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="search__film-info" disabled={props.isLoading}>
          <div className="search__input-wrap">
            <input type="search" name="movie" required
              autoComplete="off"
              className="search__form-input"
              placeholder="Фильм"
              onChange={handleInputChange}
              value={input}
            />
            <button className="app__button search__form-btn" type="submit" aria-label="Поиск" title="Поиск" />
          </div>
          <FilterCheckbox
            labelClass="search__checkbox"
            labelText="Короткометражки"
            checkboxName="short"
            isChecked={isShortMovie}
            onCheckboxChange={handleCheckboxClick}
          />
          {validityError && <p className="search__error">{validityError}</p>}
        </fieldset>
      </form>
    </section>
  )
}

export default SearchForm;