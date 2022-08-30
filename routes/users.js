const router = require('express').Router();
const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/users');

const {
  validateUpdateUser,
} = require('../middlewares/validate');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', validateUpdateUser, updateUserInfo);

module.exports = router;
