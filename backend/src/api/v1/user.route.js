const { getAllUsers, getUserById, updateUserDetails } = require('../../controllers/user.controllers');
const { ensureAuthenticated } = require('../../middlewares');

const router = require('express').Router();

router.get('/all', getAllUsers);
router.get('/:id', getUserById);
router.put('/update/:id', updateUserDetails);
// router.delete('/delete/:id', ensureAuthenticated, updateUserDetails);

module.exports = router;