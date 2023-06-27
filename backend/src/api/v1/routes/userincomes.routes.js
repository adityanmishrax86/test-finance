const { createUserIncome, getAllUserIncomes } = require('../../../controllers/userincomes.controllers');
const { ensureAuthenticated } = require('../../../middlewares');

const router = require('express').Router();

// router.get("/categories", getAllExpenses);
router.post("/create", createUserIncome);
router.get("/all", getAllUserIncomes);
// router.put("/update/:id", updateUserExpense);

module.exports = router;