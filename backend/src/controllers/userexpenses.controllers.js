const { Op } = require("sequelize");
const db = require("../models");
// Define the User model
const User = db.User;

const Expense = db.Expense;

const UserExpenses = db.UserExpense;

// Create a new user expense
const createUserExpense = async (req, res, next) => {
  const {
    expenseId,
    userId,
    value,
    dateOfExpense,
    modeOfExpense,
    name,
    description,
  } = req.body;
  try {
    const userExpense = await UserExpenses.create({
      expenseId,
      userId,
      value,
      dateOfExpense,
      modeOfExpense,
      name,
      description,
    });
    return res.status(200).send(userExpense);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Get all user expenses
const getAllUserExpenses = async (req, res, next) => {
  try {
    const { startDt, endDt } = req.query;
    let userExpenses;

    if (startDt && endDt) {
      userExpenses = await User.findOne({
        where: {
          id: req.query.id,
        },
        attributes: ["id"],
        include: [
          {
            model: UserExpenses,
            where: {
              dateOfExpense: {
                [Op.between]: [startDt, endDt],
              },
            },
            as: "expenses",
            attributes: { exclude: ["userId", "expenseId"] },
            include: [
              {
                model: Expense,
                as: "category",
                attributes: ["category"],
              },
            ],
          },
        ],
      });
    } else {
      userExpenses = await User.findOne({
        where: {
          id: req.query.id,
        },
        attributes: ["id"],
        include: [
          {
            model: UserExpenses,
            as: "expenses",
            attributes: { exclude: ["userId", "expenseId"] },
            include: [
              { model: Expense, as: "category", attributes: ["category"] },
            ],
          },
        ],
      });
    }

    res.status(200).send(userExpenses);
  } catch (error) {
    next(error);
  }
};

const getAllExpenses = async (req, res, next) => {
  try {
    const allExpenseCategories = await Expense.findAll();
    res.status(200).send({
      status: true,
      allExpenseCategories,
    });
  } catch (error) {
    next(error);
  }
};

// Update a user expense
const updateUserExpense = async (req, res, next) => {
  try {
    const { ...details } = req.body;
    let userExpense = await UserExpenses.findByPk(req.params.id);

    if (!userExpense) {
      next("User expense not found");
    }

    userExpense = await UserExpenses.update(details, {
      where: {
        id: req.params.id,
      },
    });

    return res.status(201).json({
      status: true,
      userExpense,
    });
  } catch (error) {
    console.error("Error updating user expense:", error);
    throw error;
  }
};

// Delete a user expense
const deleteUserExpense = async (userExpenseId) => {
  try {
    const userExpense = await db.UserExpense.findByPk(userExpenseId);
    if (!userExpense) {
      throw new Error("User expense not found");
    }
    await userExpense.destroy();
    return userExpense;
  } catch (error) {
    console.error("Error deleting user expense:", error);
    throw error;
  }
};

module.exports = {
  getAllExpenses,
  getAllUserExpenses,
  createUserExpense,
  updateUserExpense,
  deleteUserExpense,
};
