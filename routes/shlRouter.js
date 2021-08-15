const express = require('express');
const shlRouter = express.Router();

const getList = require('../middlewares/getList');
const validateJWT = require('../middlewares/validateJWT');
const validatePage = require('../middlewares/validatePage');
const validateHeroName = require('../middlewares/validateHeroName');

const {
  getPageOfHeroesController,
  getHeroByNameController,
  getMyListOfHeroesController,
  getHeroByIdController,
  getHeroesQuantityController,
} = require('../controllers/shlController');

shlRouter.get('/search', [
  validateHeroName,
  getHeroByNameController,
]);
shlRouter.get('/quantity', getHeroesQuantityController);
shlRouter.get('/mylist', [
  validateJWT,
  getList,
  getMyListOfHeroesController,
]);
shlRouter.get('/:id', [
  validateJWT,
  getHeroByIdController,
]);
shlRouter.get('/', [
  validateJWT,
  validatePage,
  getPageOfHeroesController,
]);

module.exports = shlRouter;
