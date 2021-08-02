const {
  getPageOfHeroesService,
  getHeroByNameService,
  getMyListOfHeroesService,
  getHeroByIdService,
  getHeroesQuantityService,
} = require('../services/shlService');

const getPageOfHeroesController = async (req, res) => {
  const { query: { page } } = req;
  const result = await getPageOfHeroesService(page);
  const { code, response } = result;
  return res.status(code).json(response);
};

const getHeroByNameController = async (req, res) => {
  const { params: { name } } = req;
  const result = await getHeroByNameService(name);
  const { code, response } = result;
  return res.status(code).json(response);
};

const getMyListOfHeroesController = async (req, res) => {
  const { list } = req;
  const result = await getMyListOfHeroesService(list);
  const { code, response } = result;
  return res.status(code).json(response);
};

const getHeroByIdController = async (req, res) => {
  const { params: { id } } = req;
  const result = await getHeroByIdService(id);
  const { code, response } = result;
  return res.status(code).json(response);
};

const getHeroesQuantityController = async (_req, res) => {
  const result = await getHeroesQuantityService();
  const { code, response } = result;
  return res.status(code).json(response);
};

module.exports = {
  getPageOfHeroesController,
  getHeroByNameController,
  getMyListOfHeroesController,
  getHeroByIdController,
  getHeroesQuantityController,
};
