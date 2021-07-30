const express = require('express');
const userRouter = express.Router();

const validateJWT = require('../middlewares/validateJWT');

const {
  getAllUsersController,
  getUserByIdController,
  registerUserController,
  registerHeroOnListController,
} = require('../controllers/userController');

userRouter.get('/', getAllUsersController);
userRouter.get('/:id', getUserByIdController);
userRouter.post('/', registerUserController);
userRouter.post('/:heroId', [
  validateJWT,
  registerHeroOnListController,
]);

module.exports = userRouter;
