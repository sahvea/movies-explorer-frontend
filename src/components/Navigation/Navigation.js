import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navigation__menu">
        <ul className="navigation__list">
          <li className="navigation__list-item">
            <NavLink to="/" className="link navigation__link navigation__link_direction_main-page" activeClassName="navigation__link_active">Главная</NavLink>
          </li>
          <li className="navigation__list-item">
            <NavLink to="/movies" className="link navigation__link" activeClassName="navigation__link_active">Фильмы</NavLink>
          </li>
          <li className="navigation__list-item">
            <NavLink to="/saved-movies" className="link navigation__link" activeClassName="navigation__link_active">Сохранённые фильмы</NavLink>
          </li>
        </ul>
      </nav>

    </div>
  )
}

export default Navigation;