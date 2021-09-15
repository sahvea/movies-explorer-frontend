import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navigation__menu">
        <ul className="navigation__list">
          <li className="navigation__list-item navigation__list-item_link-direction_main-page">
            <NavLink to="/" className="link navigation__link" activeClassName="navigation__link_active">Главная</NavLink>
          </li>
          <li className="navigation__list-item">
            <NavLink to="/movies" className="link navigation__link" activeClassName="navigation__link_active">Фильмы</NavLink>
          </li>
          <li className="navigation__list-item">
            <NavLink to="/saved-movies" className="link navigation__link" activeClassName="navigation__link_active">Сохранённые фильмы</NavLink>
          </li>
        </ul>

        <Link to="/profile" className="navigation__profile">Аккаунт
          <span className="navigation__profile-icon-area">
            <svg className="navigation__profile-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="navigation__profile-svg" fillRule="evenodd" clipRule="evenodd" d="M7.43028 7.96749C8.7917 7.40521 9.74976 6.06449 9.74976 4.5C9.74976 2.42893 8.07082 0.75 5.99976 0.75C3.92869 0.75 2.24976 2.42893 2.24976 4.5C2.24976 6.06451 3.20783 7.40525 4.56929 7.96751C3.17499 8.19979 1.89239 8.76573 0.80835 9.58019L2.1899 11.419C3.25119 10.6217 4.56874 10.1496 5.99986 10.1496C7.43098 10.1496 8.74852 10.6217 9.80981 11.419L11.1914 9.58019C10.1073 8.7657 8.82464 8.19975 7.43028 7.96749Z"/>
            </svg>
          </span>
        </Link>
      </nav>

    </div>
  )
}

export default Navigation;