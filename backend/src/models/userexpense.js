'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserExpense extends Model {


    static associate(models) {
      // define association here
      UserExpense.belongsTo(models.User, {
        foreignKey: "userId"
      })

      UserExpense.hasOne(models.Expense, { foreignKey: 'id', as: 'category' });

    }
  }
  UserExpense.init({
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.STRING },
    expenseId: { type: DataTypes.INTEGER },
    value: { type: DataTypes.FLOAT },
    dateOfExpense: { type: DataTypes.DATE },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    sequelize,
    modelName: 'UserExpense',
    tableName: 'User_Expenses'
  });
  return UserExpense;
};