const router = require('express').Router();
const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/users');

const {
  validateUpdateUser,
} = require('../middlewares/validate');

router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateUser, updateUserInfo);

module.exports = router;
