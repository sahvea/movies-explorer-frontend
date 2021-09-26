import Header from '../Header/Header';
import AuthForm from '../AuthForm/AuthForm';

function Login(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <AuthForm name={'login-form'} title={'Рады видеть!'} buttonText={'Войти'}>
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

export default Login;