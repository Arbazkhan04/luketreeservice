const express = require('express');
const router = express.Router();

const { getAboutData, createAboutData , updateAboutData} = require('../controller/AboutManagementController');

router.get('/getAboutData', getAboutData);
router.post('/createAboutData', createAboutData);
router.put('/updateAboutData/:aboutId',updateAboutData);

module.exports = router;
