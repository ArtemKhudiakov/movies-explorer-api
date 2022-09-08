const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../error/notfound-error');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { NOT_FOUND_ERR } = require('../utils/constants');

const {
  validateLogin,
  validateCreateUser,
} = require('../middlewares/validate');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERR));
});

module.exports = router;
