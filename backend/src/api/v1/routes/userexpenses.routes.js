const { getAllExpenses, createUserExpense, getAllUserExpenses, updateUserExpense } = require('../../../controllers/userexpenses.controllers');
const { ensureAuthenticated } = require('../middlewares');

const router = require('express').Router();

router.get("/categories", ensureAuthenticated, getAllExpenses);
router.post("/create", ensureAuthenticated, createUserExpense);
router.get("/all", ensureAuthenticated, getAllUserExpenses);
router.put("/update/:id", ensureAuthenticated, updateUserExpense);

module.exports = router;