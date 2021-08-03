const {
  getAllUsersService,
  getUserByIdService,
  loginUserService,
  registerUserService,
  registerHeroOnListService,
  deleteHeroOfListService,
} = require('../services/userService')

const deleteSelfController = async (req, res, next) => {
  // const { body } = req;
  // const result = await loginUserService(body);
  // if (result.error) {
  //   return next(result.error);
  // }
  // const { code, response } = result;
  // return res.status(code).json(response);
};

const getAllUsersController = async (_req, res, next) => {
  const result = await getAllUsersService();
  if (result.error) {
    return next(result.error);
  }
  const { code, response } = result;
  return res.status(code).json(response);
};

const getSelfUserController = async (req, res, next) => {
  const { payload: { id } } = req;
  const result = await getUserByIdService(id);
  if (result.error) {
    return next(result.error);
  }
  const { code, response } = result;
  return res.status(code).json(response);
};

const loginController = async (req, res, next) => {
  const { body } = req;
  const result = await loginUserService(body);
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

const registerHeroOnListController = async (req, res, next) => {
  const { params: { heroId }, payload } = req;
  const userId = payload.id;
  const result = await registerHeroOnListService({ userId, heroId });
  if (result.error) {
    return next(result.error);
  }
  const { code, response } = result;
  return res.status(code).json(response);
};

const deleteHeroOfListController = async (req, res, next) => {
  const { params: { heroId }, payload } = req;
  const userId = payload.id;
  const result = await deleteHeroOfListService({ userId, heroId });
  if (result.error) {
    return next(result.error);
  }
  const { code, response } = result;
  return res.status(code).json(response);
};

module.exports = {
  deleteSelfController,
  getAllUsersController,
  getSelfUserController,
  loginController,
  registerUserController,
  registerHeroOnListController,
  deleteHeroOfListController,
};
