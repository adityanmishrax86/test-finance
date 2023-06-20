'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Expense extends Model {
        static associate(models) {
            // Define associations, if any

        }
    }
    Expense.init(
        {
            category: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Expense',
        }
    );
    return Expense;
};
