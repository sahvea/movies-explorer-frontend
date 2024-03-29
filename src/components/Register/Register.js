import React from 'react';
import Header from '../Header/Header';
import AuthForm from '../AuthForm/AuthForm';
import { useFormValidation } from '../../hooks/useFormValidation';
import { patterns } from '../../utils/constants';

function Register(props) {
  const { values, errors, isValid, handleChange } = useFormValidation({
    name: '', email: '', password: ''
  });
  const isSubmitDisabled = values.name === '' || values.email === '' || values.password === '' || !isValid;

  function handleSubmit(e) {
    e.preventDefault();

    props.onRegistration(values.email, values.password, values.name);
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <AuthForm name={'register-form'} title={'Добро пожаловать!'} buttonText={'Зарегистрироваться'} onSubmit={handleSubmit} isSubmitDisabled={isSubmitDisabled} isFormLoading={props.isFormLoading}>
          <label className="auth__form-label">Имя
            <input type="text" name="name" required
              autoComplete="off"
              minLength="2"
              maxLength="30"
              className={`auth__form-input ${errors.name ? "auth__form-input_type_error" : ""}`}
              value={values.name || ''}
              onChange={handleChange}
              pattern={patterns.name}
            />
            {errors.name && <span className="auth__form-error">{errors.name}</span>}
          </label>
          <label className="auth__form-label">E-mail
            <input type="email" name="email" required
              autoComplete="off"
              className={`auth__form-input ${errors.email ? "auth__form-input_type_error" : ""}`}
              value={values.email || ''}
              onChange={handleChange}
              pattern={patterns.email}
            />
            {errors.email && <span className="auth__form-error">{errors.email}</span>}
          </label>
          <label className="auth__form-label">Пароль
            <input type="password" name="password" required
              autoComplete="off"
              minLength="6"
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

export default Register;