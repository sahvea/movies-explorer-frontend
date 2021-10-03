import React from 'react';
import Header from '../Header/Header';
import AuthForm from '../AuthForm/AuthForm';
import { useFormValidation } from '../../hooks/useFormValidation';

function Login(props) {
  const { values, errors, isValid, handleChange } = useFormValidation({
    email: '', password: ''
  });
  const isSubmitDisabled = values.email === '' || values.password === '' || !isValid;

  function handleSubmit(e) {
    e.preventDefault();

    props.onLogin(values.email, values.password);
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <AuthForm name={'login-form'} title={'Рады видеть!'} buttonText={'Войти'} onSubmit={handleSubmit} isSubmitDisabled={isSubmitDisabled} isFormLoading={props.isFormLoading}>
          <label className="auth__form-label">E-mail
            <input type="email" name="email" required
              autoComplete="off"
              className={`auth__form-input ${errors.email ? "auth__form-input_type_error" : ""}`}
              value={values.email || ''}
              onChange={handleChange}
              pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
            />
            {errors.email && <span className="auth__form-error">{errors.email}</span>}
          </label>
          <label className="auth__form-label">Пароль
            <input type="password" name="password" required
              minLength="6"
              autoComplete="off"
              className={`auth__form-input ${errors.password ? "auth__form-input_type_error" : ""}`}
              value={values.password || ''}
              onChange={handleChange}
            />
            {errors.password && <span className="auth__form-error">{errors.password}</span>}
          </label>
        </AuthForm>
      </main>
    </>
  );
}

export default Login;