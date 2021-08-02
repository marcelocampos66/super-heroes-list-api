const express = require('express');
const shlRouter = express.Router();

const validateJWT = require('../middlewares/validateJWT');

const {
  getPageOfHeroesController,
  getHeroByNameController,
  getMyListOfHeroesController,
  getHeroByIdController,
  getHeroesQuantityController,
} = require('../controllers/shlController');

shlRouter.get('/search/:name', getHeroByNameController);
shlRouter.get('/quantity', getHeroesQuantityController);
shlRouter.get('/mylist/:arrayOfIds', [
  validateJWT,
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
