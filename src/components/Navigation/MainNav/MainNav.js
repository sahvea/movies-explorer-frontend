import { NavLink, Link, useLocation } from 'react-router-dom';
import './MainNav.css';

function MainNav(props) {
  const location = useLocation();

  return (
    <div className={`main-nav ${props.mobMenu ? "main-nav_visible" : ""}`}>
      <nav className={`main-nav__menu ${props.mobMenu ? "main-nav__menu_active" : ""}`}>
        <ul className="main-nav__list">
          <li className="main-nav__list-item main-nav__list-item_link-direction_main-page">
            <NavLink exact to="/" className="app__link main-nav__link" activeClassName="main-nav__link_active" onClick={props.handleBurgerClick}>Главная</NavLink>
          </li>
          <li className="main-nav__list-item">
            <NavLink to="/movies" className="app__link main-nav__link" activeClassName="main-nav__link_active" onClick={props.handleBurgerClick}>Фильмы</NavLink>
          </li>
          <li className="main-nav__list-item">
            <NavLink to="/saved-movies" className="app__link main-nav__link" activeClassName="main-nav__link_active" onClick={props.handleBurgerClick}>Сохранённые фильмы</NavLink>
          </li>
        </ul>

        <Link to="/profile" className="main-nav__profile" onClick={props.handleBurgerClick}>Аккаунт
          <span className={`main-nav__profile-icon-area ${location.pathname === '/' ? "main-nav__profile-icon-area_position_main-page" : ""}`}>
            <svg className="main-nav__profile-icon" width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="main-nav__profile-svg" fillRule="evenodd" clipRule="evenodd" d="M7.43 7.967a3.751 3.751 0 1 0-2.86 0A8.614 8.614 0 0 0 .807 9.58L2.19 11.42A6.317 6.317 0 0 1 6 10.149c1.431 0 2.749.473 3.81 1.27L11.19 9.58a8.614 8.614 0 0 0-3.76-1.613Z"/>
            </svg>
          </span>
        </Link>
      </nav>
    </div>
  )
}

export default MainNav;