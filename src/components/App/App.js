import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import ThemeContext from '../../contexts/ThemeContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
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
  const [isSearched, setIsSearched] = React.useState(false);
  const [isSavedSearched, setIsSavedSearched] = React.useState(false);
  const [isNewDataValid, setIsNewDataValid] = React.useState(true);
  const [isActionSuccess, setIsActionSuccess] = React.useState(true);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [infoPopupError, setInfoPopupError] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [searchedMovies, setSearchedMovies] = React.useState(
    JSON.parse(localStorage.getItem('searchResult')) || []
  );
  const [searchedSavedMovies, setSearchedSavedMovies] = React.useState([]);
  const [themeLight, setThemeLight] = React.useState(false);


  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);

      Promise.all([
        moviesApi.getMovies(),
        mainApi.getMovies()
      ])
        .then(([initialMovies, userMovies]) => {
          const initialMoviesList = parseMovies(initialMovies);
          setMovies(initialMoviesList);

          let userMoviesList = userMovies.filter(movie => {
            const userMovie = movie.owner === currentUser._id;
            localStorage.setItem(`${movie.movieId}`, JSON.stringify(true));
            return userMovie;
          });
          setSavedMovies(userMoviesList);
          setSearchedSavedMovies(userMoviesList);
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);


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
        handleActionSuccess();
        handleLogin(email, password);
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
        setCurrentUser({
          name: '',
          email: '',
          _id: ''
        });
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
    const filteredMovies = filterMovies(movies, keyword);

    setSearchedMovies(filteredMovies);
    localStorage.setItem('searchResult', JSON.stringify(filteredMovies));

    setIsSearched(true);
    setTimeout(() => setIsLoading(false), 1000);
  }

  function handleSearchSavedMovies(keyword) {
    const filteredSavedMovies = filterMovies(savedMovies, keyword);

    setSearchedSavedMovies(filteredSavedMovies);
    setIsSavedSearched(true);
    setTimeout(() => setIsLoading(false), 500);
  }


  /* =--- сохранение/удаление фильма ---= */

  function handleMovieSave(movie) {
    mainApi.createMovie(movie)
      .then(newMovie => {
        setSavedMovies([newMovie, ...savedMovies]);
        setSearchedSavedMovies([newMovie, ...savedMovies])

        localStorage.setItem(`${newMovie.movieId}`, JSON.stringify(true));
      })
      .catch(err => console.log(err));
  }

  function handleMovieDelete(movie) {
    const movieToDelete = savedMovies.filter(m => m.movieId === movie.movieId || m.data?.movieId === movie.id)[0];

    mainApi.deleteMovie(movieToDelete._id)
      .then(() => {
        const filtedMovies = savedMovies.filter(m => m._id !== movieToDelete._id);
        setSavedMovies(filtedMovies);
        setSearchedSavedMovies(filtedMovies);

        localStorage.removeItem(`${movie.movieId}`);
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
    <ThemeContext.Provider value={themeLight}>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} onThemeChange={setThemeLight} />
          </Route>
          <ProtectedRoute path="/movies" component={Movies}
            loggedIn={loggedIn}
            movies={searchedMovies}
            onMovieSave={handleMovieSave}
            onMovieDelete={handleMovieDelete}
            onMoviesSearch={handleSearchMovies}
            isSearched={isSearched}
            isLoading={isLoading}
            setPreloader={setIsLoading}
            onThemeChange={setThemeLight}
          />
          <ProtectedRoute path="/saved-movies" component={Movies}
            loggedIn={loggedIn}
            movies={searchedSavedMovies}
            onMovieDelete={handleMovieDelete}
            onMoviesSearch={handleSearchSavedMovies}
            isSearched={isSavedSearched}
            isLoading={isLoading}
            setPreloader={setIsLoading}
            onThemeChange={setThemeLight}
            />
          <ProtectedRoute path="/profile" component={Profile}
            loggedIn={loggedIn}
            onUpdateUser={handleUpdateUser}
            isNewDataValid={isNewDataValid}
            onSignOut={handleLogout}
            isFormLoading={isFormLoading}
            onThemeChange={setThemeLight}
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
    </ThemeContext.Provider>
  );
}

export default App;