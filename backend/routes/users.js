const router = require('express').Router();

const {
  validateGetUserById,
  validateUpdateProfile,
  validateUpdateAvatar,
} = require('../joi-schemas/user');
const {
  getUsers,
  getUserById,
  getUserInfo,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

// GET /users
router.get('/', getUsers);

// GET /users/me
router.get('/me', getUserInfo);

// PATCH /users/me
router.patch('/me', validateUpdateProfile, updateProfile);

// GET /users/:userId
router.get('/:userId', validateGetUserById, getUserById);

// PATCH /users/me/avatar
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
