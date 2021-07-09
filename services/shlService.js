const {
  getOnePageOfHeroes,
  getHeroByName,
  getMyListOfHeroes,
} = require('../models/shlModel');

const {
  pageNaNError,
  pageIsNotIntergerError,
  contentNotFoundError,
  heroNameSearchError,
  arrayOfIdsError,
} = require('./errors');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_UNPROCESSABLE_ENTITY_STATUS = 422

const getPageOfHeroesService = async (page) => {
  const pageNumber = parseInt(page);
  if (!pageNumber || typeof pageNumber !== 'number') {
   return ({
      code: HTTP_UNPROCESSABLE_ENTITY_STATUS,
      response: pageNaNError,
    });
  }
  if (pageNumber < 1) {
    return ({
      code: HTTP_UNPROCESSABLE_ENTITY_STATUS,
      response: pageIsNotIntergerError,
    });
  };
  const result = await getOnePageOfHeroes(pageNumber);
  if (!result) {
    return ({
      code: HTTP_NOT_FOUND_STATUS,
      reponse: contentNotFoundError,
    });
  }
  return ({
    code: HTTP_OK_STATUS,
    response: result,
  });
}

const getHeroByNameService = async (name) => {
  if (!name || typeof name !== 'string'|| name.length < 3) {
    return ({
      code: HTTP_UNPROCESSABLE_ENTITY_STATUS,
      response: heroNameSearchError,
    });
  };
  const heroes = await getHeroByName(name);
  if (!heroes) {
    return ({
      code: HTTP_NOT_FOUND_STATUS,
      reponse: contentNotFoundError,
    });
  };
  return ({
    code: HTTP_OK_STATUS,
    response: heroes,
  });
};

getMyListOfHeroesService = async (ids) => {
  if ( !ids || !Array.isArray(ids)) {
    return ({
      code: HTTP_UNPROCESSABLE_ENTITY_STATUS,
      response: arrayOfIdsError,
    });
  }
  const heroesList = await getMyListOfHeroes(ids);
  if (!heroesList) {
    return ({
      code: HTTP_NOT_FOUND_STATUS,
      reponse: contentNotFoundError,
    });
  };
  return ({
    code: HTTP_OK_STATUS,
    response: heroesList,
  });
};

module.exports = {
  getPageOfHeroesService,
  getHeroByNameService,
  getMyListOfHeroesService,
};
