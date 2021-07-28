const {
  getAllUsersService,
  registerUserService,
} = require('../services/userService')

const getAllUsersController = async (_req, res, next) => {
  const result = await getAllUsersService();
  if (result.error) {
    return next(result.error);
  }
  const { code, response } = result;
  return res.status(code).json(response);
};

const registerUserController = async (req, res, next) => {
  const { body } = req;
  const result = await registerUserService(body);
  if (result.error) {
    return next(result.error);
  }
  const { code, response } = result;
  return res.status(code).json(response);
};

// Sugestao de usar dois middlewares de auth, um para JWT e outro para validar o User e a Role do User
// Evita levar mais esse trabalho para o Service
// Inclusive acho que devemos levar o verificacao de email ja cadastrado para outro middleware

module.exports = {
  getAllUsersController,
  registerUserController,
};
