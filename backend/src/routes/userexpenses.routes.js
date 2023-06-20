const { getAllExpenses, createUserExpense, getAllUserExpenses } = require('../controllers/userexpenses.controllers');
const { ensureAuthenticated } = require('../middlewares');

const router = require('express').Router();

router.get("/categories", ensureAuthenticated, getAllExpenses);
router.post("/create", createUserExpense);
router.get("/all", getAllUserExpenses);

module.exports = router;