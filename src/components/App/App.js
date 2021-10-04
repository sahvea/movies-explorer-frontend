import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
import { codeStatuses, errorMessages } from '../../utils/constants';

import savedMovies from '../../utils/savedMovies';

function App() {
  const history = useHistory();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFormLoading, setIsFormLoading] = React.useState(false);
  const [isNewDataValid, setIsNewDataValid] = React.useState(true);
  const [isActionSuccess, setIsActionSuccess] = React.useState(true);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [infoPopupError, setInfoPopupError] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: '',
    _id: ''
  });

  // const [savedMovies, setSavedMovies] = React.useState([]);

  const handleTokenCheck = React.useCallback(() => {
    mainApi.getUserInfo()
      .then((res) => {
        setCurrentUser({
          name: res.name,
          email: res.email,
          _id: res._id
        });
        setLoggedIn(true);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      handleTokenCheck();

      setIsLoading(true);
      moviesApi.getMovies()
        .then(movies => {
          setMovies(movies);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }

      // mainApi.getMovies()
      //   .then(movies => {
      //     /* TODO: сначала настпроить currentUser */
      //     // const savedMoviesArray = movies.filter(movie => movie.owner === currentUser._id);
      //     setSavedMovies(movies);
      //   })
      //   .catch((err) => console.log(err));

  }, [loggedIn, handleTokenCheck]);

  // React.useEffect(() => {
  //   handleTokenCheck();
  // }, [handleTokenCheck])

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

  function handleRegistration(email, password, name) {
    setIsFormLoading(true);
    authApi.register(email, password, name)
      .then(res => {
        if (res) {
          handleActionSuccess();
          handleLogin(email, password);
        }
      })
      .catch(err => checkErrorStatus(err))
      .finally(() => setIsFormLoading(false));
  }

  function handleLogin(email, password) {
    setIsFormLoading(true);
    authApi.login(email, password)
      .then(() => {
        // handleTokenCheck();
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch(err => checkErrorStatus(err))
      .finally(() => setIsFormLoading(false));
  }

  function handleLogout() {
    authApi.logout()
      .then(() => {
        setLoggedIn(false);
        history.push('/');
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(email, name) {
    setIsFormLoading(true);
    mainApi.updateUserInfo({ email, name })
      .then((data) => {
        setCurrentUser({
          name: data.name,
          email: data.email
        });
        handleActionSuccess();
        setIsNewDataValid(true);
      })
      .catch(err => {
        checkErrorStatus(err);
        setIsNewDataValid(false);
      })
      .finally(() => setIsFormLoading(false));
  }

  function checkErrorStatus(errorStatus) {
    if (errorStatus === codeStatuses.internalServerErr) {
      handleActionError(errorMessages.serverError);
      return;
    }
    if (location.pathname === '/signup') {
      if (errorStatus === codeStatuses.conflictErr) {
        handleActionError(errorMessages.emailConflict);
      } else {
        handleActionError(errorMessages.registratioError);
      }
    }
    if (location.pathname === '/signin') {
      if (errorStatus === codeStatuses.unauthorizedErr) {
        handleActionError(errorMessages.authorizationError);
      } else {
        handleActionError(errorMessages.authServerError);
      }
    }
    if (location.pathname === '/profile') {
      if (errorStatus === codeStatuses.conflictErr) {
        handleActionError(errorMessages.emailConflict);
      } else {
        handleActionError(errorMessages.updateProfileError);
      }
    }
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
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn} />
        </Route>
        <ProtectedRoute path="/movies" component={Movies}
          loggedIn={loggedIn}
          movies={movies}
          isLoading={isLoading}
        />
        <ProtectedRoute path="/saved-movies" component={SavedMovies}
          loggedIn={loggedIn}
          movies={savedMovies}
          isLoading={isLoading}
        />
        <ProtectedRoute path="/profile" component={Profile}
          loggedIn={loggedIn}
          onUpdateUser={handleUpdateUser}
          isNewDataValid={isNewDataValid}
          onSignOut={handleLogout}
          isFormLoading={isFormLoading}
        />
        <Route path="/signup">
          <Register onRegistration={handleRegistration} isFormLoading={isFormLoading} />
        </Route>
        <Route path="/signin">
          <Login onLogin={handleLogin} isFormLoading={isFormLoading} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

      <InfoPopup isOpen={isInfoPopupOpen} onClose={closePopups} onSuccess={isActionSuccess} errorMessage={infoPopupError} />
    </CurrentUserContext.Provider>
  );
}

export default App;