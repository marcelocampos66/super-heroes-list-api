const { ObjectId } = require('mongodb');

const {
  getOnePageOfHeroes,
  getHeroByName,
  getMyListOfHeroes,
  getHeroById,
  getHeroesQuantity,
} = require('../shlModels/shlModel');

const {
  contentNotFoundError,
  invalidIdError,
} = require('../utils/errors');

const getPageOfHeroesService = async (page) => {
  const pageNumber = parseInt(page);
  try {
    const result = await getOnePageOfHeroes(pageNumber);
    return ({
      type: 'ok',
      response: result,
    });
  } catch (error) {
    return { error };
  }
}

const getHeroByNameService = async (name) => {
  try {
    const heroes = await getHeroByName(name);
    return ({
      type: 'ok',
      response: heroes,
    });
  } catch (error) {
    return { error };
  }
};

const getMyListOfHeroesService = async (ids) => {
  try {
    const heroesList = await getMyListOfHeroes(ids);
    if (!heroesList) {
      return ({
        type: 'not_found',
        response: contentNotFoundError,
      });
    };
    return ({
      type: 'ok',
      response: heroesList,
    });
  } catch (error) {
    return { error };
  }
};

const getHeroByIdService = async (id) => {
  if (!ObjectId.isValid(id)) {
    return ({
      type: 'unprocessable_entity',
      response: invalidIdError,
    });
  }
  try {
    const hero = await getHeroById(id);
    if (!hero) {
      return ({
        type: 'not_found',
        response: contentNotFoundError,
      });
    }
    return ({
      type: 'ok',
      response: hero,
    });
  } catch (error) {
    return { error };
  }
}

const getHeroesQuantityService = async () => {
  try {
    const result = await getHeroesQuantity();
    return ({
      type: 'ok',
      response: { heroesQuantity: result },
    });
  } catch (error) {
    return { error };
  }
};

module.exports = {
  getPageOfHeroesService,
  getHeroByNameService,
  getMyListOfHeroesService,
  getHeroByIdService,
  getHeroesQuantityService,
};
