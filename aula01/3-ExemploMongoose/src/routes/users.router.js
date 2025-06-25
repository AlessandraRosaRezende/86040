const { Router } = require('express');
const usersController = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.post('/', usersController.createUser);
usersRouter.patch('/:id', usersController.updateUser);
usersRouter.put('/:id', usersController.updateUserAllFields);
usersRouter.delete('/:id', usersController.deleteUser);
usersRouter.delete('/', usersController.deleteAllUsers);

module.exports = usersRouter;