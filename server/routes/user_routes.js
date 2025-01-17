const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users_controller');

// Routes for users
router.post('/createUser', UserController.createUser);
router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getUserById/:userid', UserController.getUserById);
router.put('/UpdateUser/:userid', UserController.updateUser);
router.delete('/deleteUser/:userid', UserController.deleteUser);

 router.post('/login', UserController.login);

module.exports = router;
