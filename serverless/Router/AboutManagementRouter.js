const express = require('express');
const router = express.Router();

const { getAboutData, createAboutData , updateAboutData} = require('../controller/AboutManagementController');
const {protect} = require('../Middleware/authMiddelware')

router.get('/getAboutData',protect, getAboutData);
router.post('/createAboutData',protect,createAboutData);
router.put('/updateAboutData/:aboutId',protect,updateAboutData);

module.exports = router;
