import React from 'react';

import Header from '../Header/Header';
import AuthForm from '../AuthForm/AuthForm';

function Login(props) {
  // eslint-disable-next-line no-unused-vars
  const [emailValidityError, setEmailValidityError] = React.useState('');
  const [passwordValidityError, setPasswordValidityError] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();

    props.onAuthenticationError();
    setPasswordValidityError('Просто пример ошибки.')
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <AuthForm name={'login-form'} title={'Рады видеть!'} buttonText={'Войти'} onSubmit={handleSubmit} >
          <label className="auth__form-label">E-mail
            <input type="email" name="email" required className={`auth__form-input ${emailValidityError ? "auth__form-input_type_error" : ""}`} autoComplete="on" />
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

export default Login;