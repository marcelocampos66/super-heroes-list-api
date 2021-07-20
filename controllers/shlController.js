const {
  getPageOfHeroesService,
  getHeroByNameService,
  getMyListOfHeroesService,
  getHeroByIdService,
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
  const { params: { arrayOfIds } } = req;
  const { ids } = JSON.parse(arrayOfIds);
  const result = await getMyListOfHeroesService(ids);
  const { code, response } = result;
  return res.status(code).json(response);
};

const getHeroByIdController = async (req, res) => {
  const { params: { id } } = req;
  const result = await getHeroByIdService(id);
  const { code, response } = result;
  return res.status(code).json(response);
};

module.exports = {
  getPageOfHeroesController,
  getHeroByNameController,
  getMyListOfHeroesController,
  getHeroByIdController,
};
