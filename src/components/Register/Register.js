import Header from '../Header/Header';
import AuthForm from '../AuthForm/AuthForm';

function Register(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <AuthForm name={'register-form'} title={'Добро пожаловать!'} buttonText={'Зарегистрироваться'}>
          <label className="auth__form-label">Имя
            <input type="text" name="name" required className="auth__form-input" autoComplete="on" minLength="2" maxLength="30" />
          </label>
          <label className="auth__form-label">E-mail
            <input type="email" name="email" required className="auth__form-input" autoComplete="on" />
          </label>
          <label className="auth__form-label">Пароль
            <input type="password" name="password" required className="auth__form-input" minLength="6" autoComplete="off" />
          </label>
        </AuthForm>
      </main>
    </>
  );
}

export default Register;