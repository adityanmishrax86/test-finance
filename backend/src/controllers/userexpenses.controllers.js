const { Sequelize } = require('sequelize');
const db = require('../config/db');
// Define the User model
const User = db.define('Users', {
    id: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
});

const Expense = db.define('Expense', {
    id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
    category: { type: Sequelize.STRING },
}, {
    timestamps: false,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
});

const UserExpenses = db.define('User_Expenses', {
    id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    userId: { type: Sequelize.STRING },
    expenseId: { type: Sequelize.INTEGER },
    value: { type: Sequelize.FLOAT },
    dateOfExpense: { type: Sequelize.DATE },
    createdAt: { type: Sequelize.DATE, defaultValue: new Date().getTime() },
    updatedAt: { type: Sequelize.DATE, defaultValue: new Date().getTime() }
})


User.hasMany(UserExpenses, {
    foreignKey: "userId"
})
UserExpenses.belongsTo(User, {
    foreignKey: "userId"
})

UserExpenses.hasOne(Expense, { foreignKey: 'id' });

// Create a new user expense
const createUserExpense = async (req, res, next) => {
    const { expenseId, userId, value, dateOfExpense } = req.body;
    try {
        const userExpense = await UserExpenses.create({ expenseId, userId, value, dateOfExpense });
        return res.status(200).send(userExpense);
    } catch (error) {
        console.log(error)
        next(error);
    }
};

// Get all user expenses
const getAllUserExpenses = async (req, res, next) => {
    try {
        const userExpenses = await User.findOne({
            where: {
                id: req.body.id
            },
            include: [{ model: UserExpenses, include: Expense, }]
        });
        res.status(200).send(userExpenses);
    } catch (error) {
        next(error);
    }
};


const getAllExpenses = async (req, res, next) => {
    try {
        const allExpenseCategories = await Expense.findAll();
        res.status(200).send(allExpenseCategories);
    } catch (error) {
        next(error);
    }
}

// Update a user expense
const updateUserExpense = async (userExpenseId, expenseId, userId, value, dateOfExpense) => {
    try {
        const userExpense = await db.UserExpense.findByPk(userExpenseId);
        if (!userExpense) {
            throw new Error('User expense not found');
        }
        userExpense.expenseId = expenseId;
        userExpense.userId = userId;
        userExpense.value = value;
        userExpense.dateOfExpense = dateOfExpense;
        await userExpense.save();
        return userExpense;
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
    getAllExpenses,
    getAllUserExpenses,
    createUserExpense,
    updateUserExpense,
    deleteUserExpense
}
