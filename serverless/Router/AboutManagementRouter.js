const express = require('express');
const router = express.Router();

const { getAboutData, createAboutData } = require('../controller/AboutManagementController');

router.get('/getAboutData', getAboutData);
router.post('/createAboutData', createAboutData); // Added missing forward slash

module.exports = router;
