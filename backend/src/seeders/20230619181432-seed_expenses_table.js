'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const expensesData = [
      { category: 'Housing' },
      { category: 'Utilities' },
      { category: 'Transportation' },
      { category: 'Groceries' },
      { category: 'Dining out' },
      { category: 'Entertainment' },
      { category: 'Personal care' },
      { category: 'Health and wellness' },
      { category: 'Education' },
      { category: 'Debt payments' },
      { category: 'Savings' },
      { category: 'Insurance' },
      { category: 'Gifts and donations' },
      { category: 'Travel' },
      { category: 'Clothing and accessories' },
      { category: 'Childcare' },
      { category: 'Taxes' },
      { category: 'Miscellaneous' },

      // Add more seed data for other categories
    ];

    await queryInterface.bulkInsert('Expenses', expensesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Expenses', null, {});
  }
};
