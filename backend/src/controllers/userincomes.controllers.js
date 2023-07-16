const { Op } = require('sequelize');
const db = require('../models');
// Define the User model
const User = db.User;

const UserIncome = db.UserIncome;


// Create a new user expense
const createUserIncome = async (req, res, next) => {
    const { name, description, userId, value, dateOfIncome, incomeType, modeOfIncome } = req.body;
    try {
        const userIncome = await UserIncome.create({ name, description, userId, value, dateOfIncome, incomeType, modeOfIncome });
        return res.status(200).send(userIncome);
    } catch (error) {
        console.log(error)
        next(error);
    }
};

// Get all user expenses
const getAllUserIncomes = async (req, res, next) => {
    try {
        const { startDt, endDt } = req.query;
        let userIncomes;

        if (startDt && endDt) {
            userIncomes = await User.findOne({
                where: {
                    id: req.query.id,
                },
                attributes: ["id"],
                include: [{
                    model: UserIncome,
                    where: {
                        dateOfIncome: {
                            [Op.between]: [startDt, endDt]
                        },
                    },
                    as: 'incomes',
                    attributes: { exclude: ['userId'] },
                }]
            });
        } else {
            userIncomes = await User.findOne({
                where: {
                    id: req.query.id
                },
                attributes: ["id"],
                include: [{
                    model: UserIncome, as: 'incomes', attributes: { exclude: ['userId'] }
                }]
            });
        }

        res.status(200).send(userIncomes);
    } catch (error) {
        next(error);
    }
};


// Update a user expense
const updateUserExpense = async (req, res, next) => {

    try {
        const { ...details } = req.body;
        let userIncome = await UserIncome.findByPk(req.params.id);

        if (!userIncome) {
            next('User income not found');
        }

        userIncome = await UserIncome.update(details, {
            where: {
                id: req.params.id
            }
        });

        return res.status(201).json({
            status: true,
            userIncome
        })
    } catch (error) {
        console.error('Error updating user expense:', error);
        throw error;
    }
};

// Delete a user expense
const deleteUserExpense = async (userExpenseId) => {
    try {
        const userExpense = await db.UserExpense.findByPk(userExpenseId);
        if (!userExpense) {
            throw new Error('User expense not found');
        }
        await userExpense.destroy();
        return userExpense;
    } catch (error) {
        console.error('Error deleting user expense:', error);
        throw error;
    }
};

module.exports = {
    createUserIncome,
    getAllUserIncomes,
    updateUserExpense
}
