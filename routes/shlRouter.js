const express = require('express');
const shlRouter = express.Router();

const validateJWT = require('../middlewares/validateJWT');
const getList = require('../middlewares/getList');

const {
  getPageOfHeroesController,
  getHeroByNameController,
  getMyListOfHeroesController,
  getHeroByIdController,
  getHeroesQuantityController,
} = require('../controllers/shlController');

shlRouter.get('/search', getHeroByNameController);
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
  getPageOfHeroesController,
]);

module.exports = shlRouter;
