const express = require('express');
const router = express.Router();

const {authUser,registerUser,logoutUser} = require('../controller/UserManagementController');

router.post('/authUser',authUser);
router.post('/registerUser',registerUser);
router.post('/logoutUser',logoutUser);

module.exports = router;