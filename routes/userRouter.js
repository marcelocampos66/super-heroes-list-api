const express = require('express');
const userRouter = express.Router();

const {
  getAllUsersController,
  registerUserController,
} = require('../controllers/userController');

userRouter.get('/', getAllUsersController);
userRouter.post('/', registerUserController);

module.exports = userRouter;
