const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users_controller');

// Routes for users
router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userid', UserController.getUserById);
router.put('/:userid', UserController.updateUser);
router.delete('/:userid', UserController.deleteUser);

module.exports = router;
