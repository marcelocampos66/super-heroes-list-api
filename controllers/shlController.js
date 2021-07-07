const {
  getPageOfHeroesService,
  getHeroByNameService,
} = require('../services/shlService');

const getPageOfHeroesController = async (req, res) => {
  const { query: { page } } = req;
  const result = await getPageOfHeroesService(page);
  if (!result) {
    return res.status(404).json({ message: 'Not Found' });
  }
  return res.status(200).json(result);
};

const getHeroByNameController = async (req, res) => {
  const { params: { name } } = req;
  const hero = await getHeroByNameService(name);
  if (!hero) {
    return res.status(404).json({ message: 'Hero not found' });
  }
  return res.status(200).json(hero);
};

module.exports = {
  getPageOfHeroesController,
  getHeroByNameController,
};
