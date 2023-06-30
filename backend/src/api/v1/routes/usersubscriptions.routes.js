const { createUserSubscriptions, getAllUserSubscriptions, updateUserSubscription } = require('../../../controllers/usersubscriptions.controllers');
const { ensureAuthenticated } = require('../../../middlewares');

const router = require('express').Router();

// router.get("/categories", getAllExpenses);
router.post("/create", createUserSubscriptions);
router.get("/all", getAllUserSubscriptions);
router.put("/update/:id", updateUserSubscription);

module.exports = router;