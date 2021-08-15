const {
  getAllUsersService,
  getUserByIdService,
  loginUserService,
  registerUserService,
  registerHeroOnListService,
  deleteHeroOfListService,
  updateUserInfosService,
} = require('../services/userService')

const STATUS = {
  ok: 200,
  created: 201,
  no_content: 204,
  not_found: 404,
};

const getAllUsersController = async (_req, res, next) => {
  const result = await getAllUsersService();
  if (result.error) {
    return next(result.error);
  }
  const { type, response } = result;
  return res.status(STATUS[type]).json(response);
};

const getSelfUserController = async (req, res, next) => {
  const { payload: { id } } = req;
  const result = await getUserByIdService(id);
  if (result.error) {
    return next(result.error);
  }
  const { type, response } = result;
  return res.status(STATUS[type]).json(response);
};

const loginController = async (req, res, next) => {
  const { body: { email, password } } = req;
  const result = await loginUserService({ email, password });
  if (result.error) {
    return next(result.error);
  }
  const { type, response } = result;
  return res.status(STATUS[type]).json(response);
};

const registerUserController = async (req, res, next) => {
  const { body } = req;
  const result = await registerUserService(body);
  if (result.error) {
    return next(result.error);
  }
  const { type, response } = result;
  return res.status(STATUS[type]).json(response);
};

const registerHeroOnListController = async (req, res, next) => {
  const { params: { heroId }, payload } = req;
  const userId = payload.id;
  const result = await registerHeroOnListService({ userId, heroId });
  if (result.error) {
    return next(result.error);
  }
  const { type, response } = result;
  return res.status(STATUS[type]).json(response);
};

const deleteHeroOfListController = async (req, res, next) => {
  const { params: { heroId }, payload } = req;
  const userId = payload.id;
  const result = await deleteHeroOfListService({ userId, heroId });
  if (result.error) {
    return next(result.error);
  }
  const { type } = result;
  return res.status(STATUS[type]).end();
};

const updateUserInfosController = async (req, res, next) => {
  const { payload: { id }, body } = req;
  const result = await updateUserInfosService(id, body);
  if (result.error) {
    return next(result.error);
  }
  const { type, response } = result;
  return res.status(STATUS[type]).json(response);
};

module.exports = {
  getAllUsersController,
  getSelfUserController,
  loginController,
  registerUserController,
  registerHeroOnListController,
  deleteHeroOfListController,
  updateUserInfosController,
};
