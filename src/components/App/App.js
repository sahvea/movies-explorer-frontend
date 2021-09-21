import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies'

function App() {
  const location = useLocation();

  // eslint-disable-next-line no-unused-vars
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
      </Switch>

      {( location.pathname === '/' ||  loggedIn) && <Footer />}
    </>
  );
}

export default App;