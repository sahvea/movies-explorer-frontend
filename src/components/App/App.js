import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

import initialMovies from '../../utils/initialMovies';
import savedMovies from '../../utils/savedMovies';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [loggedIn, setLoggedIn] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn} />
        </Route>
        <Route path="/movies">
          <Movies loggedIn={loggedIn} movies={initialMovies} isLoading={isLoading} />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies loggedIn={loggedIn} movies={savedMovies} isLoading={isLoading} />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;