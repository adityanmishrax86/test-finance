const { getAllUsers, getUserById, updateUserDetails } = require('../../../controllers/user.controllers');
const { ensureAuthenticated } = require('../../../middlewares');

const router = require('express').Router();

router.get('/all', ensureAuthenticated, getAllUsers);
router.get('/:id', ensureAuthenticated, getUserById);
router.put('/update/:id', ensureAuthenticated, updateUserDetails);
// router.delete('/delete/:id', ensureAuthenticated, updateUserDetails);

module.exports = router;