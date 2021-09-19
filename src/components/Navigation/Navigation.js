import { useLocation } from 'react-router-dom';
import Burger from './Burger/Burger';
import MainNav from './MainNav/MainNav';
import AuthNav from './AuthNav/AuthNav';

function Navigation(props) {
  const location = useLocation();

  return (
    props.loggedIn ?
      <>
        <Burger mobMenu={props.mobMenu} handleBurgerClick={props.handleBurgerClick} />
        <MainNav mobMenu={props.mobMenu} handleBurgerClick={props.handleBurgerClick} />
      </>
    : location.pathname === '/' &&
      <AuthNav />
  )
}

export default Navigation;