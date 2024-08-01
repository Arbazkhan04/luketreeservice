const express = require('express');
const router = express.Router();

const {createReview} = require('../controller/ReviewManagementController');

router.post('/createReview',createReview);

module.exports = router;