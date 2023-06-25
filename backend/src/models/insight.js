const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Insight extends Model { }

    Insight.init({

        insightId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },

        userId: {
            type: DataTypes.UUID,
            references: {
                model: "Users",
                key: 'id'
            },
            allowNull: false
        },
        insightText: {
            type: DataTypes.TEXT,
            allowNull: true,

        },
        dateGenerated: {
            type: DataTypes.DATE
        },


    },

        {
            sequelize,
            modelName: 'Insight'
        });
    return Insight;
}



