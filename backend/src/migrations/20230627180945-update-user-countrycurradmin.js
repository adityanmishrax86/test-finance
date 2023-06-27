'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      await queryInterface.addColumn('Users', 'country', {
        type: Sequelize.STRING,
        allowNull: true,
      }),

      await queryInterface.addColumn('Users', 'currency', {
        type: Sequelize.STRING,
        allowNull: true,
      }),

      await queryInterface.addColumn('Users', 'isAdmin', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      })
    ])
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([
      await queryInterface.removeColumn('Users', 'country'),

      await queryInterface.removeColumn('Users', 'currency'),

      await queryInterface.removeColumn('Users', 'isAdmin')
    ])

  }
};
