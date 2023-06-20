'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserExpense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here

    }
  }
  UserExpense.init({
    expenseId: DataTypes.INTEGER,
    userId: DataTypes.UUID,
    value: DataTypes.FLOAT,
    dateOfExpense: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserExpense',
  });
  return UserExpense;
};