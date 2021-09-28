import React from 'react';
import { useHistory } from "react-router-dom";
import './Profile.css';
import Header from '../Header/Header';
import DotsLoader from '../DotsLoader/DotsLoader';

function Profile(props) {
  const history = useHistory();
  const currentUser = "Виталий";
  const currentUserEmail = "pochta@yandex.ru";
  const [name, setName] = React.useState(currentUser);
  const [email, setEmail] = React.useState(currentUserEmail);
  const [isDisabled, setIsDisabled] = React.useState(true);

  function handleNameInputChange(e) {
    const nameInput = e.target;
    const { value } = nameInput;
    setName(value);
  }

  function handleEmailInputChange(e) {
    const emailInput = e.target;
    const { value } = emailInput;
    setEmail(value);
  }

  function handleEditBtnClick() {
    setIsDisabled(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onEditSuccess();
    setIsDisabled(true);
  }

  function handleSignOut() {
    history.push('/signup');
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <section className="profile">
          <form className="profile__form" name="profile-form" onSubmit={handleSubmit} noValidate>
            <fieldset className="profile__user-info">
              <legend className="profile__greeting">Привет, {currentUser}!</legend>
              <label className="profile__form-label">Имя
                <input type="text" name="name" value={name} required className="profile__form-input" autoComplete="off" minLength="2" maxLength="30" onChange={handleNameInputChange} disabled={isDisabled} ref={input => input && input.focus()} />
              </label>
              <label className="profile__form-label">E-mail
                <input type="email" name="email" value={email} required className="profile__form-input" autoComplete="off" onChange={handleEmailInputChange} disabled={isDisabled} />
              </label>

              {!isDisabled
                && <button type="submit" name="submit" className="app__button profile__button profile__button_type_submit" disabled={props.isFormLoading ? true : ''}>
                  {props.isFormLoading ? "Сохранение" : "Сохранить"}
                  {props.isFormLoading && (<DotsLoader />)}
                </button>
              }
            </fieldset>
          </form>
          {isDisabled &&
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