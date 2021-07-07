const express = require('express');
const shlRouter = express.Router();

const {
  getPageOfHeroesController,
  getHeroByNameController,
} = require('../controllers/shlController');

shlRouter.get('/', getPageOfHeroesController);
shlRouter.get('/:name', getHeroByNameController);

module.exports = shlRouter;
