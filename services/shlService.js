const joi = require('joi');
const { ObjectId } = require('mongodb');

const {
  getOnePageOfHeroes,
  getHeroByName,
  getMyListOfHeroes,
  getHeroById,
} = require('../models/shlModel');

const {
  contentNotFoundError,
  invalidIdError,
} = require('./errors');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_UNPROCESSABLE_ENTITY_STATUS = 422

const verifyPage = (page) => (
  joi.number().integer().min(1).required().validate(page)
);

const verifyHeroName = (name) => (
  joi.string().min(3).required().validate(name)
);

const verifyArrayOfIds = (ids) => (
  joi.array().items(joi.string().length(24)).required().validate(ids)
);

const getPageOfHeroesService = async (page) => {
  const pageNumber = parseInt(page);
  const { error } = verifyPage(pageNumber);
  if (error) {
    const message = error.details[0].message;
    const type = (error.details[0].type).replace('.', '_');
    return ({
      code: HTTP_UNPROCESSABLE_ENTITY_STATUS,
      response: { type, message },
    });
  }
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
  const { error } = verifyHeroName(name);
  if (error) {
    const message = error.details[0].message;
    const type = (error.details[0].type).replace('.', '_');
    return ({
      code: HTTP_UNPROCESSABLE_ENTITY_STATUS,
      response: { type, message },
    });
  }
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

const getMyListOfHeroesService = async (ids) => {
  const { error } = verifyArrayOfIds(ids);
  if (error) {
    const message = error.details[0].message;
    const type = (error.details[0].type).replace('.', '_');
    return ({
      code: HTTP_UNPROCESSABLE_ENTITY_STATUS,
      response: { type, message },
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

const getHeroByIdService = async (id) => {
  if (!ObjectId.isValid(id)) {
    return ({
      code: HTTP_UNPROCESSABLE_ENTITY_STATUS,
      response: invalidIdError,
    });
  }
  const hero = await getHeroById(id);
  if (!hero) {
    return ({
      code: HTTP_NOT_FOUND_STATUS,
      reponse: contentNotFoundError,
    });
  }
  return ({
    code: HTTP_OK_STATUS,
    response: hero,
  });
}

module.exports = {
  getPageOfHeroesService,
  getHeroByNameService,
  getMyListOfHeroesService,
  getHeroByIdService,
};
