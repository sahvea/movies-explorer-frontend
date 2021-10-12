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
import { parseMovies, filterMovies } from '../../utils/utils';

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
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [searchedSavedMovies, setSearchedSavedMovies] = React.useState([]);


  const getInitialMovies = React.useCallback(() => {
    setIsLoading(true);

    moviesApi.getMovies()
      .then(movies => {
        const movieList = parseMovies(movies);
        setMovies(movieList);
      })
      .catch(err => {
        console.log(err);
        handleActionError(errorMessages.moviesSearchError);
      })
      .finally(() => setIsLoading(false));
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      const searchResult = JSON.parse(localStorage.getItem('searchResult'));

      if (searchResult) {
        setSearchedMovies(searchResult);
      }
      else {
        getInitialMovies();
      }

      mainApi.getMovies()
        .then(movies => {
          const userMovies = movies.filter(movie => {
            const userMovie = movie.owner === currentUser._id;
            localStorage.setItem(`${userMovie.movieId}`, JSON.stringify(true));
            return userMovie;
          });
          setSavedMovies(userMovies);
          setSearchedSavedMovies(userMovies);
          localStorage.setItem('savedMovies', JSON.stringify(userMovies));
        })
        .catch(err => console.log(err));
    }
  }, [currentUser._id, getInitialMovies, loggedIn]);


  /* =--- регистрация, авторизация, аутентификация ---= */

  const handleTokenCheck = React.useCallback(() => {
    mainApi.getUserInfo()
      .then(res => {
        setCurrentUser({
          name: res.name,
          email: res.email,
          _id: res._id
        });
        setLoggedIn(true);

        if (location.pathname === '/signin' || location.pathname === '/signup') {
          history.push('/movies');
        } else {
          history.push(location.pathname);
        }
      })
      .catch(err => {
        console.log(err);
        history.push('/');
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

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
        localStorage.clear();
        // localStorage.removeItem('searchResult');
        // localStorage.removeItem('savedMovies');
        setCurrentUser({});
        setMovies([]);
        setSavedMovies([]);
        setSearchedMovies([]);
        setSearchedSavedMovies([]);
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


  /* =--- поиск фильма ---= */

  function handleSearchMovies(keyword) {
    getInitialMovies();
    setSearchedMovies(filterMovies(movies, keyword));
    localStorage.setItem('searchResult', JSON.stringify(filterMovies(movies, keyword)));
  }

  function handleSearchSavedMovies(keyword) {
    setSearchedSavedMovies(filterMovies(savedMovies, keyword));
  }


  /* =--- сохранение/удаление фильма ---= */

  function handleMovieSave(movie) {
    mainApi.createMovie(movie)
      .then(newMovie => {
        setSavedMovies([newMovie, ...savedMovies]);
        setSearchedSavedMovies([newMovie, ...savedMovies])
        localStorage.setItem(`${movie.movieId}`, JSON.stringify(true));

        const userMovies = JSON.parse(localStorage.getItem('savedMovies'));
        userMovies.push(newMovie);
        localStorage.setItem('savedMovies', JSON.stringify(userMovies));
      })
      .catch(err => console.log(err));
  }

  function handleMovieDelete(movie) {
    const movieToDelete = savedMovies.find(m => m.movieId === movie.movieId);

    mainApi.deleteMovie(movieToDelete._id)
      .then(() => {
        const filtedMovies = savedMovies.filter(m => m._id !== movieToDelete._id);
        setSavedMovies(filtedMovies);
        setSearchedSavedMovies(filtedMovies);

        localStorage.removeItem(`${movie.movieId}`);

        let userMovies = JSON.parse(localStorage.getItem('savedMovies'));
        userMovies = userMovies.filter(m => m._id !== movieToDelete._id);
        localStorage.setItem('savedMovies', JSON.stringify(userMovies));
      })
      .catch(err => console.log(err));
  }


  /* =--- обработка ошибок ---= */

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn} />
        </Route>
        <ProtectedRoute path="/movies" component={Movies}
          loggedIn={loggedIn}
          movies={searchedMovies}
          // savedMovies={savedMovies}
          onMovieSave={handleMovieSave}
          onMovieDelete={handleMovieDelete}
          onMoviesSearch={handleSearchMovies}
          isLoading={isLoading}
        />
        <ProtectedRoute path="/saved-movies" component={SavedMovies}
          loggedIn={loggedIn}
          movies={searchedSavedMovies}
          // savedMovies={savedMovies}
          onMovieDelete={handleMovieDelete}
          onMoviesSearch={handleSearchSavedMovies}
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