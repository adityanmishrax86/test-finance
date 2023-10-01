"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    static associate(models) {
      // Define associations, if any
      Expense.belongsTo(models.UserExpense, {
        foreignKey: "id",
        targetKey: "expenseId",
      });
    }
  }
  Expense.init(
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      category: {
        type: DataTypes.STRING,
        defaultValue: "Uncategorised",
      },
    },
    {
      sequelize,
      modelName: "Expense",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Expense;
};
