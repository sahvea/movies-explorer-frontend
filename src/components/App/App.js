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
import { codeStatuses, errorMessages, apiUrl } from '../../utils/constants';

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
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);

      Promise.all([
        moviesApi.getMovies(),
        mainApi.getMovies()
      ])
        .then(([movies, localMovies]) => {
          const movieList = movies.map(movie => ({
            ...movie,
            trailer: movie.trailerLink,
            image: `${apiUrl}${movie.image.url}`,
            thumbnail: `${apiUrl}${movie.image.formats.thumbnail.url}`,
            movieId: movie.id,
          }));
          setMovies(movieList);

          const savedMoviesArray = localMovies.filter(movie => movie.owner === currentUser._id);
          setSavedMovies(savedMoviesArray);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));

      // moviesApi.getMovies()
      //   .then(movies => {
      //     const movieList = movies.map(movie => ({
      //       ...movie,
      //       trailer: movie.trailerLink,
      //       image: `${apiUrl}${movie.image.url}`,
      //       thumbnail: `${apiUrl}${movie.image.formats.thumbnail.url}`,
      //       movieId: movie.id,
      //     }));
      //     setMovies(movieList);
      //   })
      //   .catch((err) => console.log(err))
      //   .finally(() => setIsLoading(false));

      // mainApi.getMovies()
      //   .then(movies => {
      //     const savedMoviesArray = movies.filter(movie => movie.owner === currentUser._id);
      //     setSavedMovies(savedMoviesArray);
      //     // localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      //   })
      //   .catch((err) => console.log(err))
      //   .finally(() => setIsLoading(false));
    }

  }, [currentUser._id, loggedIn]);

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


  /* ---------------------------------------------- */
  /* -= регистрация, авторизация, аутентификация =- */
  /* ---------------------------------------------- */

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
    handleTokenCheck();
  }, [handleTokenCheck])

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
        handleTokenCheck();
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
        setCurrentUser({});
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


  /* -------------------------------- */
  /* -= сохранение/удаление фильма =- */
  /* -------------------------------- */

  function handleMovieSave(movie) {
    mainApi.createMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => console.log(err));
  }

  function handleMovieDelete(movie) {
    const movieToDelete = savedMovies.find((m) => m.movieId === movie.id);

    mainApi.deleteMovie(movieToDelete._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((m) => m._id !== movieToDelete._id));
      })
      .catch((err) => console.log(err));
  }


  /* ---------------------- */
  /* -= обработка ошибок =- */
  /* ---------------------- */

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
      return;
    }
    if (location.pathname === '/signin') {
      if (errorStatus === codeStatuses.unauthorizedErr) {
        handleActionError(errorMessages.authorizationError);
      } else {
        handleActionError(errorMessages.authServerError);
      }
      return;
    }
    if (location.pathname === '/profile') {
      if (errorStatus === codeStatuses.conflictErr) {
        handleActionError(errorMessages.emailConflict);
      } else {
        handleActionError(errorMessages.updateProfileError);
      }
      return;
    }
    handleActionError(errorMessages.serverError);
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
          savedMovies={savedMovies}
          onMovieSave={handleMovieSave}
          onMovieDelete={handleMovieDelete}
          isLoading={isLoading}
        />
        <ProtectedRoute path="/saved-movies" component={SavedMovies}
          loggedIn={loggedIn}
          movies={savedMovies}
          savedMovies={savedMovies}
          onMovieDelete={handleMovieDelete}
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