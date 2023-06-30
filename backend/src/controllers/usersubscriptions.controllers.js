const { Op } = require('sequelize');
const db = require('../models');
// Define the User model
const User = db.User;

const UserSubscriptions = db.UserSubscriptions;


// Create a new user expense
const createUserSubscriptions = async (req, res, next) => {
    const { name, description, userId, value, subType } = req.body;
    try {
        const userSubscriptions = await UserSubscriptions.create({ name, description, userId, value, subType });
        return res.status(200).send(userSubscriptions);
    } catch (error) {
        console.log(error)
        next(error);
    }
};

// Get all user expenses
const getAllUserSubscriptions = async (req, res, next) => {
    try {
        const { startDt, endDt } = req.query;
        let userSubscriptions;

        if (startDt && endDt) {
            userSubscriptions = await User.findOne({
                where: {
                    id: req.body.id,
                },
                attributes: ["id"],
                include: [{
                    model: UserSubscriptions,
                    where: {
                        createdAt: {
                            [Op.between]: [startDt, endDt]
                        },
                    },
                    as: 'subscriptions',
                    attributes: { exclude: ['userId'] },
                }]
            });
        } else {
            userSubscriptions = await User.findOne({
                where: {
                    id: req.body.id
                },
                attributes: ["id"],
                include: [{
                    model: UserSubscriptions, as: 'subscriptions', attributes: { exclude: ['userId'] }
                }]
            });
        }

        res.status(200).send(userSubscriptions);
    } catch (error) {
        next(error);
    }
};


// Update a user expense
const updateUserSubscription = async (req, res, next) => {

    try {
        const { ...details } = req.body;
        let userSubscription = await UserSubscriptions.findByPk(req.params.id);

        if (!userSubscription) {
            next('User income not found');
        }

        userSubscription = await UserSubscriptions.update(details, {
            where: {
                id: req.params.id
            }
        });

        return res.status(201).json({
            status: true,
            userSubscription
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
    createUserSubscriptions,
    getAllUserSubscriptions,
    updateUserSubscription
}
