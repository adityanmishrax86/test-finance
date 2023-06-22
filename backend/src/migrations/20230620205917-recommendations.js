'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('Recommendations', {
    recommendationId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    // foreign key 
    userId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users', // name of the table we're referencing
          key: 'id'
        },
        allowNull: false,
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },

    recommendationText: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    dateGenerated: Sequelize.DATE,

   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Recommendations')
  }
};
