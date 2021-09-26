/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import InfoPopup from '../InfoPopup/InfoPopup';

import initialMovies from '../../utils/initialMovies';
import savedMovies from '../../utils/savedMovies';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = React.useState(true);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [infoPopupError, setInfoPopupError] = React.useState('');

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closePopups();
      }
    }
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  React.useEffect(() => {
    function handleOverlayClose(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closePopups();
      }
    }
    document.addEventListener('click', handleOverlayClose);

    return () => {
      document.removeEventListener('click', handleOverlayClose);
    };
  }, []);

  function handleAuthorizationSuccess() {
    setIsInfoPopupOpen(true);
    setIsRegistrationSuccess(true);
  }

  function handleAuthorizationError() {
    setIsInfoPopupOpen(true);
    setIsRegistrationSuccess(false);
    setInfoPopupError('Просто пример ошибки. Lorem ipsum dolor sit amet, consectetur adipiscing elit');
  }

  function closePopups() {
    setIsInfoPopupOpen(false);
  }

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
          <Register onRegistrationSuccess={handleAuthorizationSuccess} onRegistrationError={handleAuthorizationError} />
        </Route>
        <Route path="/signin">
          <Login onAuthenticationError={handleAuthorizationError} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

      <InfoPopup isOpen={isInfoPopupOpen} onClose={closePopups} onSuccess={isRegistrationSuccess} errorMessage={infoPopupError} />
    </>
  );
}

export default App;