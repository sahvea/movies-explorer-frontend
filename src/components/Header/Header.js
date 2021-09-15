/* eslint-disable jsx-a11y/anchor-is-valid */
// import React from 'react';
import './Header.css'
import Navigation from '../Navigation/Navigation';
import * as menu from '../../utils/menu';

function Header(props) {
  function handleHeaderBurgerClick() {
    menu.toggleHeaderBurger();
  }

  return (
    <header className={`header ${!props.loggedIn ? "header_unauthorized" : ""}`}>
      {/* TODO: ссылка должна вести на стр "О проекте" */}
      <a href="#" target="_self" className="header__logo-link">
        <svg className="header__logo" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="header__logo-svg" fillRule="evenodd" clipRule="evenodd" d="M19 38C29.4934 38 38 29.4934 38 19C38 8.50659 29.4934 0 19 0C8.50659 0 0 8.50659 0 19C0 29.4934 8.50659 38 19 38ZM19 28.5C24.2467 28.5 28.5 24.2467 28.5 19C28.5 13.7533 24.2467 9.5 19 9.5C13.7533 9.5 9.5 13.7533 9.5 19C9.5 24.2467 13.7533 28.5 19 28.5Z"/>
        </svg>
      </a>

      {props.loggedIn &&
        <>
          <button type="button" className="button header__burger" onClick={handleHeaderBurgerClick}>
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
          </button>
          <Navigation />
        </>
      }

    </header>
  )
}

export default Header;