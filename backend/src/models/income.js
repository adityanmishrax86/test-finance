'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserIncome extends Model {


        static associate(models) {
            // define association here
            UserIncome.belongsTo(models.User, {
                foreignKey: "userId"
            })

        }
    }
    UserIncome.init({
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
        userId: { type: DataTypes.STRING },
        value: { type: DataTypes.FLOAT },
        modeOfIncome: { type: DataTypes.ENUM('UPI', 'CASH', 'DEBIT CARD', 'CREDIT CARD'), defaultValue: 'UPI' },
        dateOfIncome: { type: DataTypes.DATE },
        incomeType: { type: DataTypes.STRING },
        createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
        sequelize,
        modelName: 'UserIncome',
        tableName: 'Incomes'
    });
    return UserIncome;
};