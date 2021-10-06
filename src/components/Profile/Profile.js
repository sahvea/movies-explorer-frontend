import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Profile.css';
import Header from '../Header/Header';
import DotsLoader from '../DotsLoader/DotsLoader';
import { useFormValidation } from '../../hooks/useFormValidation';
import { patterns } from '../../utils/constants';

function Profile(props) {
  const [isFormDisabled, setFormIsDisabled] = React.useState(true);
  const currentUser = React.useContext(CurrentUserContext);
  const inputRef = React.useRef(null);
  const { values, errors, isValid, handleChange } = useFormValidation({
    name: currentUser.name, email: currentUser.email
  });
  const isSubmitDisabled = values.name === '' || values.email === ''
    || ( values.name === currentUser.name && values.email === currentUser.email )
    || !isValid;

  React.useEffect(() => {
    setFormIsDisabled(props.isNewDataValid);
  }, [props.isNewDataValid])

  function handleEditBtnClick() {
    setFormIsDisabled(false);
    inputRef.current.focus();
  }

  // React.useEffect(() => {
  //   inputRef.current.focus();
  // }, [])

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser(values.email, values.name);
    setFormIsDisabled(props.isNewDataValid);
  }

  function handleSignOut() {
    props.onSignOut();
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <section className="profile">
          <form name="profile-form" className="profile__form" onSubmit={handleSubmit} noValidate>
            <fieldset className="profile__user-info" disabled={props.isFormLoading || isFormDisabled}>
              <legend className="profile__greeting">Привет, {currentUser.name}!</legend>
              <label className="profile__form-label">Имя
                <input type="text" name="name" required
                  autoComplete="off"
                  minLength="2"
                  maxLength="30"
                  className={`profile__form-input ${errors.name ? "profile__form-input_type_error" : ""}`}
                  value={values.name}
                  onChange={handleChange}
                  ref={inputRef}
                  pattern={patterns.name}
                />
                {errors.name && <span className="profile__form-error">{errors.name}</span>}
              </label>
              <label className="profile__form-label">E-mail
                <input type="email" name="email" required
                  autoComplete="off"
                  className={`profile__form-input ${errors.email ? "profile__form-input_type_error" : ""}`}
                  value={values.email}
                  onChange={handleChange}
                  pattern={patterns.email}
                />
                {errors.email && <span className="profile__form-error">{errors.email}</span>}

              </label>

              {!isFormDisabled
                && <button type="submit" name="submit" className="app__button profile__button profile__button_type_submit" disabled={isSubmitDisabled}>
                  {props.isFormLoading ? "Сохранение" : "Сохранить"}
                  {props.isFormLoading && (<DotsLoader />)}
                </button>
              }
            </fieldset>
          </form>
          {isFormDisabled &&
            <>
              <button type="button" className="app__button profile__button" onClick={handleEditBtnClick}>Редактировать</button>
              <button type="button" className="app__button profile__button profile__button_type_signout" onClick={handleSignOut}>Выйти из аккаунта</button>
            </>
          }
        </section>
      </main>
    </>
  );
}

export default Profile;