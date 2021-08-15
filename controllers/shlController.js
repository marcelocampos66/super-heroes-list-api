const {
  getPageOfHeroesService,
  getHeroByNameService,
  getMyListOfHeroesService,
  getHeroByIdService,
  getHeroesQuantityService,
} = require('../services/shlService');

const STATUS = {
  ok: 200,
  created: 201,
  no_content: 204,
  not_found: 404,
  unprocessable_entity: 422,
};

const getPageOfHeroesController = async (req, res, next)=> {
  const { query: { page } } = req;
  const result = await getPageOfHeroesService(page);
  if (result.error) {
    return next(result.error);
  }
  const { type, response } = result;
  return res.status(STATUS[type]).json(response);
};

const getHeroByNameController = async (req, res, next) => {
  const { query: { name } } = req;
  const result = await getHeroByNameService(name);
  if (result.error) {
    return next(result.error);
  }
  const { type, response } = result;
  return res.status(STATUS[type]).json(response);
};

const getMyListOfHeroesController = async (req, res, next) => {
  const { list } = req;
  const result = await getMyListOfHeroesService(list);
  if (result.error) {
    return next(result.error);
  }
  const { type, response } = result;
  return res.status(STATUS[type]).json(response);
};

const getHeroByIdController = async (req, res) => {
  const { params: { id } } = req;
  const result = await getHeroByIdService(id);
  if (result.error) {
    return next(result.error);
  }
  const { type, response } = result;
  return res.status(STATUS[type]).json(response);
};

const getHeroesQuantityController = async (_req, res) => {
  const result = await getHeroesQuantityService();
  if (result.error) {
    return next(result.error);
  }
  const { type, response } = result;
  return res.status(STATUS[type]).json(response);
};

module.exports = {
  getPageOfHeroesController,
  getHeroByNameController,
  getMyListOfHeroesController,
  getHeroByIdController,
  getHeroesQuantityController,
};
