/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory } from "react-router-dom";
import Header from '../Header/Header';
import AuthForm from '../AuthForm/AuthForm';

function Register(props) {
  const history = useHistory();
  const [nameValidityError, setNameValidityError] = React.useState('');
  const [emailValidityError, setEmailValidityError] = React.useState('');
  const [passwordValidityError, setPasswordValidityError] = React.useState('');
  const isSubmitDisabled = nameValidityError || emailValidityError || passwordValidityError;

  function handleSubmit(e) {
    e.preventDefault();

    props.onRegistrationSuccess();
    history.push('/signin');
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <AuthForm name={'register-form'} title={'Добро пожаловать!'} buttonText={'Зарегистрироваться'} onSubmit={handleSubmit} isSubmitDisabled={isSubmitDisabled} isFormLoading={props.isFormLoading}>
          <label className="auth__form-label">Имя
            <input type="text" name="name" required className={`auth__form-input ${nameValidityError ? "auth__form-input_type_error" : ""}`} autoComplete="off" minLength="2" maxLength="30" />
            {nameValidityError && <span className="auth__form-error">{nameValidityError}</span>}
          </label>
          <label className="auth__form-label">E-mail
            <input type="email" name="email" required className={`auth__form-input ${emailValidityError ? "auth__form-input_type_error" : ""}`} autoComplete="off" />
            {emailValidityError && <span className="auth__form-error">{emailValidityError}</span>}
          </label>
          <label className="auth__form-label">Пароль
            <input type="password" name="password" required className={`auth__form-input ${passwordValidityError ? "auth__form-input_type_error" : ""}`} minLength="6" autoComplete="off" />
            {passwordValidityError && <span className="auth__form-error">{passwordValidityError}</span>}
          </label>
        </AuthForm>
      </main>
    </>
  );
}

export default Register;