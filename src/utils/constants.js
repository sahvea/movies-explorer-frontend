import notFoundImg from '../images/img-not-found.jpg';

export const apiUrl = 'https://api.nomoreparties.co';
export const moviesApiBaseUrl = 'https://api.nomoreparties.co/beatfilm-movies';
export const mainApiBaseUrl = 'https://api.sahvea.diploma.nomoredomains.club';

export const patterns = {
  name: '^[a-zA-Zа-яА-ЯЁё\\s\\-]+$',
  email: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$',
};

export const codeStatuses = {
  badRequestErr: 400,
  unauthorizedErr: 401,
  forbiddenErr: 403,
  notFoundErr: 404,
  conflictErr: 409,
  internalServerErr: 500,
  mongoErr: 11000,
};

export const errorMessages = {
  emailConflict: 'Пользователь с таким email уже существует.',
  registratioError: 'При регистрации пользователя произошла ошибка.',
  authorizationError: 'Вы ввели неправильный логин или пароль.',
  authServerError: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
  updateProfileError: 'При обновлении профиля произошла ошибка.',
  serverError: 'На сервере произошла ошибка.',
  moviesSearchError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
};

export const infoMessages = {
  moviesNotFound: 'Ничего не найдено.',
}

export const movieDataOptions = {
  noData: 'Данные отсутствуют',
  noDuration: 0,
  noTrailer: 'https://youtube.com',
  noImg: {notFoundImg},
}