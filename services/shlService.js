const {
  getOnePageOfHeroes,
  getHeroByName,
} = require('../models/shlModel');

const getPageOfHeroesService = async (page) => {
  const pageNumber = parseInt(page);
  if (!pageNumber) return null;
  if (typeof pageNumber !== 'number' || pageNumber < 1) return null;
  const result = await getOnePageOfHeroes(pageNumber);
  return result;
}

const getHeroByNameService = async (name) => {
  if (!name || name.length < 3) return null;
  const hero = await getHeroByName(name);
  if (!hero) return null;
  return hero;
};

module.exports = {
  getPageOfHeroesService,
  getHeroByNameService,
};
