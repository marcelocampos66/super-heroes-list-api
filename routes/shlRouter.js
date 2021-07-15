const express = require('express');
const shlRouter = express.Router();

const {
  getPageOfHeroesController,
  getHeroByNameController,
  getMyListOfHeroesController,
} = require('../controllers/shlController');

shlRouter.get('/', getPageOfHeroesController);
shlRouter.get('/:name', getHeroByNameController);
shlRouter.get('/mylist/:arrayOfIds', getMyListOfHeroesController);

module.exports = shlRouter;
