import { Link, useLocation } from 'react-router-dom';
import './AuthForm.css';
import DotsLoader from '../DotsLoader/DotsLoader';

function AuthForm(props) {
  const location = useLocation();

  const redirectionText = location.pathname === '/signup'
    ? "Уже зарегистрированы?"
    : "Ещё не зарегистрированы?";
  const redirectionLinkText = location.pathname === '/signup'
    ? "Войти"
    : "Регистрация";
  const redirectionLink = location.pathname === '/signup'
    ? "/signin"
    : "/signup";

  return (
    <section className="auth">
      <form className="auth__form" name={props.name} onSubmit={props.onSubmit} >
      {/* noValidate */}
        <fieldset className="auth__form-fieldset">
          <legend className="auth__form-title">{props.title}</legend>
            {props.children}
          <button type="submit" name="submit" className="app__button auth__form-btn" disabled={props.isFormLoading || props.isSubmitDisabled ? true : ''}>
            {props.buttonText}
            {props.isFormLoading && (<DotsLoader />)}
          </button>
        </fieldset>
      </form>
      <div className="auth__redirection">
        <p className="auth__redirection-paragraph">{redirectionText}&nbsp;</p>
        <Link to={redirectionLink} className="app__link auth__redirection-link">{redirectionLinkText}</Link>
      </div>
    </section>
  );
}

export default AuthForm;