import { useLocation } from 'react-router-dom';
import Burger from './Burger/Burger';
import MainNav from './MainNav/MainNav';
import AuthNav from './AuthNav/AuthNav';

function Navigation(props) {
  const location = useLocation();

  return (
    props.loggedIn && ( location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile' ) ?
      <>
        <Burger onBurgerClick={props.onBurgerClick} />
        <MainNav />
      </>
    : location.pathname === '/' &&
      <AuthNav />
  )
}

export default Navigation;