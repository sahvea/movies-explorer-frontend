import notFoundImg from '../images/img-not-found.jpg';

export const API_URL = 'https://api.nomoreparties.co';
export const MOVIES_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const MAIN_API_URL = 'https://api.sahvea.diploma.nomoredomains.club';

export const MAX_MOVIE_DURATION = 40;

export const patterns = {
  name: '^[a-zA-Zа-яА-ЯЁё\\s\\-]+$',
  email: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$',
};

export const windowSizes = {
  desktop: 1023,
  mobile: 480,
}

export const cardsNumbers = {
  desktop: 12,
  tablet: 8,
  mobile: 5,
}

export const nextCardsNumbers = {
  desktop: 3,
  tablet: 2,
  mobile: 1,
}

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
  registrationSuccess: 'Вы успешно зарегистрировались!',
  updatingDataSuccess: 'Данные успешно обновлены!',
  error: 'Что-то пошло не так! Попробуйте ещё раз.',
}

export const movieDataOptions = {
  noData: 'Данные отсутствуют',
  noDuration: 0,
  noTrailer: 'https://youtube.com',
  noImg: {notFoundImg},
}