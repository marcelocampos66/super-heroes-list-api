const express = require('express');
const userRouter = express.Router();

const validateJWT = require('../middlewares/validateJWT');

const {
  getAllUsersController,
  getUserByIdController,
  loginController,
  registerUserController,
  registerHeroOnListController,
} = require('../controllers/userController');

userRouter.get('/', getAllUsersController);
userRouter.get('/:id', getUserByIdController);
userRouter.post('/login', loginController);
userRouter.post('/', registerUserController);
userRouter.post('/:heroId', [
  validateJWT,
  registerHeroOnListController,
]);
// userRouter.delete('/', deleteSelf);

module.exports = userRouter;
