'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.UserExpense, {
        foreignKey: "userId",
        as: 'expenses'
      })

      User.hasMany(models.UserIncome, {
        foreignKey: "userId",
        as: 'incomes'
      })

      User.hasMany(models.UserSubscriptions, {
        foreignKey: "userId",
        as: 'subscriptions'
      })
    }
  }
  User.init({
    id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    auth0id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};