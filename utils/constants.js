const CORS_URL = [
  'https://artemmovies.nomoredomains.sbs',
  'http://artemmovies.nomoredomains.sbs',
  'http://localhost:3000',
  'https://locahost:3000',
];

const NOT_FOUND_ERR = 'Запрашиваемый ресурс не найден';
const AUTH_ERR = 'Неправильная почта или пароль';
const SERVER_ERR = 'На сервере произошла ошибка';
const AUTH_REQ_ERR = 'Необходима авторизация';
const CONFLICT_ERR = 'Пользователь с таким email уже существует';
const BAD_REQUEST_ERR = 'Переданы некорректные данные';
const VALID_ERR = 'Данные не прошли валидацию';
const MOVIE_NOT_FOUND_ERR = 'Фильм с id не существует';
const FORBIDDEN_DEL_MOVIE_ERR = 'Недостаточно прав для удаления фильма';
const MOVIE_IS_DELETED = 'Фильм удален';

module.exports = {
  CORS_URL,
  NOT_FOUND_ERR,
  AUTH_ERR,
  SERVER_ERR,
  AUTH_REQ_ERR,
  CONFLICT_ERR,
  BAD_REQUEST_ERR,
  VALID_ERR,
  MOVIE_NOT_FOUND_ERR,
  FORBIDDEN_DEL_MOVIE_ERR,
  MOVIE_IS_DELETED,
};
