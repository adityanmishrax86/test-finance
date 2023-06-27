'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subscriptions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      subType: {
        type: Sequelize.ENUM('Weekly', 'Monthly', 'Quarterly', 'Yearly'),
        defaultValue: 'Monthly'
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      dateOfStart: {
        type: Sequelize.DATE,
        allowNull: true
      },
      dateOfEnd: {
        type: Sequelize.DATE,
        allowNull: true
      },
      dateOfNextPayment: {
        type: Sequelize.DATE,
        allowNull: true
      },
      reminder: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Subscriptions');
  }
};
