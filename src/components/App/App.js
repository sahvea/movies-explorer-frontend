/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import InfoPopup from '../InfoPopup/InfoPopup';

import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import authApi from '../../utils/AuthApi';

// import initialMovies from '../../utils/initialMovies';
import savedMovies from '../../utils/savedMovies';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFormLoading, setIsFormLoading] = React.useState(false);
  const [isActionSuccess, setIsActionSuccess] = React.useState(true);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [infoPopupError, setInfoPopupError] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  // const [savedMovies, setSavedMovies] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    moviesApi.getMovies()
      .then(movies => {
        setMovies(movies);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));

      // mainApi.getMovies()
      //   .then(movies => {
      //     /* TODO: сначала настпроить currentUser */
      //     // const savedMoviesArray = movies.filter(movie => movie.owner === currentUser._id);
      //     setSavedMovies(movies);
      //   })
      //   .catch((err) => console.log(err));

  }, []);

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

  function handleRegistration(name, email, password) {
    authApi.register(name, email, password)
      .then(res => {
        if (res) {
          handleActionSuccess();
          history.push('/signin');
        }
      })
      .catch(err => {
        handleActionError(err);
      });
  }

  function handleActionSuccess() {
    setIsInfoPopupOpen(true);
    setIsActionSuccess(true);
  }

  function handleActionError(message) {
    setIsInfoPopupOpen(true);
    setIsActionSuccess(false);
    setInfoPopupError(message);
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
          <Movies loggedIn={loggedIn} movies={movies} isLoading={isLoading} />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies loggedIn={loggedIn} movies={savedMovies} isLoading={isLoading} />
        </Route>
        <Route path="/profile">
          <Profile loggedIn={loggedIn} onEditSuccess={handleActionSuccess} onEditError={handleActionError} isFormLoading={isFormLoading} />
        </Route>
        <Route path="/signup">
          <Register onRegistration={handleRegistration} onRegistrationSuccess={handleActionSuccess} onRegistrationError={handleActionError} isFormLoading={isFormLoading} />
        </Route>
        <Route path="/signin">
          <Login onAuthenticationError={handleActionError} isFormLoading={isFormLoading} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

      <InfoPopup isOpen={isInfoPopupOpen} onClose={closePopups} onSuccess={isActionSuccess} errorMessage={infoPopupError} />
    </>
  );
}

export default App;