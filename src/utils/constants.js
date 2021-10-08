
const apiUrl = 'https://api.nomoreparties.co';
const moviesApiBaseUrl = 'https://api.nomoreparties.co/beatfilm-movies';
const mainApiBaseUrl = 'https://api.sahvea.diploma.nomoredomains.club';

const patterns = {
  name: '^[a-zA-Zа-яА-ЯЁё\\s\\-]+$',
  email: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$',
};

const codeStatuses = {
  badRequestErr: 400,
  unauthorizedErr: 401,
  forbiddenErr: 403,
  notFoundErr: 404,
  conflictErr: 409,
  internalServerErr: 500,
  mongoErr: 11000,
};

const errorMessages = {
  emailConflict: 'Пользователь с таким email уже существует.',
  registratioError: 'При регистрации пользователя произошла ошибка.',
  authorizationError: 'Вы ввели неправильный логин или пароль.',
  authServerError: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
  updateProfileError: 'При обновлении профиля произошла ошибка.',
  serverError: 'На сервере произошла ошибка.',
  moviesSearchError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
};

const infoMessages = {
  moviesNotFound: 'Ничего не найдено.',
}

export { apiUrl, moviesApiBaseUrl, mainApiBaseUrl, patterns, codeStatuses, errorMessages, infoMessages };