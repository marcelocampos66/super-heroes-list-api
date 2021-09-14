const express = require('express');
const userRouter = express.Router();

const validateJWT = require('../middlewares/validateJWT');
const validateUserInfos = require('../middlewares/validateUserInfos');
const verifyUserExists = require('../middlewares/verifyUserExists');
const validateLogin = require('../middlewares/validateLogin');
const validateListRegister = require('../middlewares/validateListRegister');

const {
  getAllUsersController,
  getSelfUserController,
  loginController,
  registerUserController,
  registerHeroOnListController,
  deleteHeroOfListController,
  updateUserInfosController,
  recoverPasswordController,
} = require('../controllers/userController');

userRouter.get('/', getAllUsersController);
userRouter.post('/login', [
  validateLogin,
  loginController,
]);
userRouter.post('/', [
  validateUserInfos,
  verifyUserExists,
  registerUserController,
]);
userRouter.post('/:heroId', [
  validateJWT,
  validateListRegister,
  registerHeroOnListController,
]);
userRouter.delete('/:heroId', [
  validateJWT,
  validateListRegister,
  deleteHeroOfListController,
]);
userRouter.get('/selfuser', [
  validateJWT,
  getSelfUserController,
]);
userRouter.put('/update-infos', [
  validateJWT,
  validateUserInfos,
  updateUserInfosController,
]);
userRouter.post('/recover/password', recoverPasswordController);

module.exports = userRouter;
