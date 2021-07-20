const express = require('express');
const shlRouter = express.Router();

const {
  getPageOfHeroesController,
  getHeroByNameController,
  getMyListOfHeroesController,
  getHeroByIdController,
} = require('../controllers/shlController');

shlRouter.get('/', getPageOfHeroesController);
shlRouter.get('/:id', getHeroByIdController);
shlRouter.get('/search/:name', getHeroByNameController);
shlRouter.get('/mylist/:arrayOfIds', getMyListOfHeroesController);

module.exports = shlRouter;
