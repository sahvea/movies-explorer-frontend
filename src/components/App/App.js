import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import initialMovies from '../../utils/initialMovies';
import savedMovies from '../../utils/savedMovies';
import NotFound from '../NotFound/NotFound';


function App() {
  // eslint-disable-next-line no-unused-vars
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);

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
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;