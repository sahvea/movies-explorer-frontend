import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css'
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const location = useLocation();
  const [isHidden, setIsHidden] = React.useState(false);
  const [mobMenu, setMobMenu] = React.useState(false);

  const headerClassName = `header
    ${isHidden ? "header_hidden" : ""}
    ${location.pathname === '/' ? "header_position_main-page" : ""}
    ${( location.pathname === '/signup' || location.pathname === '/signin' )
      ? "header_static"
      : ""}`;
  const headerContainerClassName = `header__container
    ${( location.pathname === '/signup' || location.pathname === '/signin' )
      ? "header__container_unauthorized"
      : ""}`;

  React.useEffect(() => {
    if (location.pathname !== '/signup' && location.pathname !== '/signin') {
      let current = 0;
      const checkScroll = () => {
        setIsHidden(window.pageYOffset > current);
        current = window.pageYOffset;
      };

      document.addEventListener('scroll', checkScroll);

      return () => document.removeEventListener('scroll', checkScroll);
    }
  }, [location.pathname]);

  function handleBurgerClick() {
    setMobMenu(!mobMenu);
  };

  return (
    <header className={headerClassName}>
      <div className={headerContainerClassName}>
        <Link to="/" className="header__logo-link">
          <svg className="header__logo" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="header__logo-svg" fillRule="evenodd" clipRule="evenodd" d="M19 38c10.493 0 19-8.507 19-19S29.493 0 19 0 0 8.507 0 19s8.507 19 19 19Zm0-9.5a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Z"/>
          </svg>
        </Link>
        <Navigation mobMenu={mobMenu} handleBurgerClick={handleBurgerClick} loggedIn={props.loggedIn} />
      </div>
    </header>
  )
}

export default Header;