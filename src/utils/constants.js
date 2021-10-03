const apiUrl = 'https://api.nomoreparties.co';
const moviesApiBaseUrl = 'https://api.nomoreparties.co/beatfilm-movies';
const mainApiBaseUrl = 'https://api.sahvea.diploma.nomoredomains.club';

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
};

export { apiUrl, moviesApiBaseUrl, mainApiBaseUrl, codeStatuses, errorMessages };