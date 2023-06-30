const { createUserSubscriptions, getAllUserSubscriptions } = require('../../../controllers/usersubscriptions.controllers');
const { ensureAuthenticated } = require('../../../middlewares');

const router = require('express').Router();

// router.get("/categories", getAllExpenses);
router.post("/create", createUserSubscriptions);
router.get("/all", getAllUserSubscriptions);
// router.put("/update/:id", updateUserExpense);

module.exports = router;