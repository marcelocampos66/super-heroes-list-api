'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => (
    queryInterface.bulkInsert('Lists', [
      {
        userId: 1,
        heroId: '60e8cef2849ece5d484ff622',
      },
      {
        userId: 1,
        heroId: '60e8cef2849ece5d484ff62b',
      },
    ], {})
  ),

  down: async (queryInterface, _Sequelize) => queryInterface.bulkDelete('Lists', null, {}),
};
