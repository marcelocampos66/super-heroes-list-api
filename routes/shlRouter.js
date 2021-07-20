const express = require('express');
const shlRouter = express.Router();

const {
  getPageOfHeroesController,
  getHeroByNameController,
  getMyListOfHeroesController,
  getHeroByIdController,
  getHeroesQuantityController,
} = require('../controllers/shlController');

shlRouter.get('/search/:name', getHeroByNameController);
shlRouter.get('/mylist/:arrayOfIds', getMyListOfHeroesController);
shlRouter.get('/quantity', getHeroesQuantityController);
shlRouter.get('/:id', getHeroByIdController);
shlRouter.get('/', getPageOfHeroesController);

module.exports = shlRouter;
