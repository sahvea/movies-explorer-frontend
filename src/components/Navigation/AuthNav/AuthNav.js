import { Link } from 'react-router-dom';
import './AuthNav.css';

function AuthNav() {
  return (
    <nav className="auth-nav">
      <ul className="auth-nav__list">
        <li>
          <Link to="/signup" className="app__link auth-nav__link">Регистрация</Link>
        </li>
        <li>
          <Link to="/signin" className="app__link auth-nav__link auth-nav__link_type_btn">Войти</Link>
        </li>
      </ul>
    </nav>
  )
}

export default AuthNav;