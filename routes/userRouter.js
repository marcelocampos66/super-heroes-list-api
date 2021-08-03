const express = require('express');
const userRouter = express.Router();

const validateJWT = require('../middlewares/validateJWT');

const {
  getAllUsersController,
  getSelfUserController,
  loginController,
  registerUserController,
  registerHeroOnListController,
  deleteHeroOfListController,
} = require('../controllers/userController');

userRouter.get('/', getAllUsersController);
userRouter.post('/login', loginController);
userRouter.post('/', registerUserController);
userRouter.post('/:heroId', [
  validateJWT,
  registerHeroOnListController,
]);
userRouter.get('/selfuser', [
  validateJWT,
  getSelfUserController,
]);
userRouter.delete('/:heroId', [
  validateJWT,
  deleteHeroOfListController,
]);
// userRouter.delete('/', deleteSelf);

module.exports = userRouter;
