import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import DotsLoader from '../DotsLoader/DotsLoader';
import { useFormValidation } from '../../hooks/useFormValidation';

function Profile(props) {
  const [isFormDisabled, setFormIsDisabled] = React.useState(true);
  const inputRef = React.useRef(null);
  const userName = props.currentUser.name;
  const userEmail = props.currentUser.email;
  const { values, isValid, handleChange } = useFormValidation({
    name: userName, email: userEmail
  });
  const isSubmitDisabled = values.name === '' || values.email === '' || !isValid;

  function handleEditBtnClick() {
    setFormIsDisabled(false);
    inputRef.current.focus();
  }

  // React.useEffect(() => {
  //   inputRef.current.focus();
  // }, [])

  function handleSubmit(e) {
    e.preventDefault();

    props.onEditSuccess();
    setFormIsDisabled(true);
  }

  function handleSignOut() {
    props.onLogout();
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <section className="profile">
          <form name="profile-form" className="profile__form" onSubmit={handleSubmit} noValidate>
            <fieldset className="profile__user-info" disabled={props.isFormLoading || isFormDisabled}>
              <legend className="profile__greeting">Привет, {userName}!</legend>
              <label className="profile__form-label">Имя
                <input type="text" name="name" required
                  autoComplete="off"
                  minLength="2"
                  maxLength="30"
                  className="profile__form-input"
                  value={values.name || userName}
                  onChange={handleChange}
                  ref={inputRef}
                />
              </label>
              <label className="profile__form-label">E-mail
                <input type="email" name="email" required
                  autoComplete="off"
                  className="profile__form-input"
                  value={values.email || userEmail}
                  onChange={handleChange}
                  pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                />
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