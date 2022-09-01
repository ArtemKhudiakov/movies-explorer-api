const Movie = require('../models/movies');

const BadRequestError = require('../error/badrequest-error');
const ForbiddenError = require('../error/forbidden-error');
const NotFoundError = require('../error/notfound-error');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN } = req.body;
  const owner = req.user._id;
  Movie.create({ country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN, owner })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Данные не прошли валидацию1'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => new NotFoundError('Фильм с id не существует'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Недостаточно прав для удаления карточки'));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
