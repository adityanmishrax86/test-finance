"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Recommendation extends Model { }

  Recommendation.init(
    {
      recommendationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },

      // foreign key 
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'Users', // name of the table we're referencing
          key: 'id'
        },
        allowNull: false
      },

      recommendationText: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateGenerated: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Recommendation",
    }
  );
  return Recommendation;
}


