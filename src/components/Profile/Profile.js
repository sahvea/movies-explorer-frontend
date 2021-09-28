import React from 'react';
import { useHistory } from "react-router-dom";
import './Profile.css';
import Header from '../Header/Header';
import DotsLoader from '../DotsLoader/DotsLoader';
import { useFormValidation } from '../../hooks/useFormValidation';

function Profile(props) {
  const history = useHistory();
  const [isFormDisabled, setFormIsDisabled] = React.useState(true);
  const currentUserName = "Виталий";
  const currentUserEmail = "pochta@yandex.ru";
  const { values, isValid, handleChange } = useFormValidation({
    name: currentUserName, email: currentUserEmail
  });
  const isSubmitDisabled = values.name === '' || values.email === '' || !isValid;

  function handleEditBtnClick() {
    setFormIsDisabled(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onEditSuccess();
    setFormIsDisabled(true);
  }

  function handleSignOut() {
    history.push('/signup');
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <section className="profile">
          <form name="profile-form" className="profile__form" onSubmit={handleSubmit} noValidate>
            <fieldset className="profile__user-info" disabled={props.isFormLoading || isFormDisabled}>
              <legend className="profile__greeting">Привет, {currentUserName}!</legend>
              <label className="profile__form-label">Имя
                <input type="text" name="name" required
                  autoComplete="off"
                  minLength="2"
                  maxLength="30"
                  className="profile__form-input"
                  value={values.name}
                  onChange={handleChange}
                  ref={input => input && input.focus()}
                />
              </label>
              <label className="profile__form-label">E-mail
                <input type="email" name="email" required
                  autoComplete="off"
                  className="profile__form-input"
                  value={values.email}
                  onChange={handleChange}
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