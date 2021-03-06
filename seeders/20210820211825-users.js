'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => (
    queryInterface.bulkInsert('Users', [
      {
        name: 'admin',
        password: 'admin123',
        age: 99,
        email: 'superheroeslist.contato@gmail.com',
        role: 'admin',
        image: null,
      },
    ], {})
  ),

  down: async (queryInterface, _Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
