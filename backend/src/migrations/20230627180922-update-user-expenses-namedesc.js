'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      await queryInterface.addColumn('User_Expenses', 'name', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      await queryInterface.addColumn('User_Expenses', 'description', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      await queryInterface.addColumn('User_Expenses', 'modeOfExpense', {
        type: Sequelize.ENUM('UPI', 'CASH', 'DEBIT CARD', 'CREDIT CARD'),
        defaultValue: 'UPI',
      })
    ])

  },

  async down(queryInterface, Sequelize) {
    await Promise.all([
      await queryInterface.removeColumn('User_Expenses', 'name'),
      await queryInterface.removeColumn('User_Expenses', 'description'),
      await queryInterface.removeColumn('User_Expenses', 'modeOfExpense')
    ])

  }
};
