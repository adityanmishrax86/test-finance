'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserSubscriptions extends Model {


        static associate(models) {
            // define association here
            UserSubscriptions.belongsTo(models.User, {
                foreignKey: "userId"
            })

        }
    }
    UserSubscriptions.init({
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
        userId: { type: DataTypes.STRING },
        value: { type: DataTypes.FLOAT },
        subType: { type: DataTypes.ENUM('Weekly', 'Monthly', 'Quarterly', 'Yearly'), defaultValue: 'Weekly' },
        dateOfStart: { type: DataTypes.DATE },
        dateOfEnd: { type: DataTypes.DATE },
        dateOfNextPayment: { type: DataTypes.DATE },
        reminder: { type: DataTypes.BOOLEAN, defaultValue: false },
        active: { type: DataTypes.BOOLEAN, defaultValue: false },
        createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
        sequelize,
        modelName: 'UserSubscriptions',
        tableName: 'Subscriptions'
    });
    return UserSubscriptions;
};