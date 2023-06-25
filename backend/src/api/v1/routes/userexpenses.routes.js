const { getAllExpenses, createUserExpense, getAllUserExpenses, updateUserExpense } = require('../../../controllers/userexpenses.controllers');
const { ensureAuthenticated } = require('../../../middlewares');

const router = require('express').Router();

router.get("/categories", getAllExpenses);
router.post("/create", createUserExpense);
router.get("/all", getAllUserExpenses);
router.put("/update/:id", updateUserExpense);

module.exports = router;