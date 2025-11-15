const express = require('express');
const router = express.Router();

const {createLandingImage, updateLandingImage, getLandingImages} = require('../controller/LandingPageImageController')
// const {protect} = require('../Middleware/authMiddelware');

router.post('/createLandingImage', createLandingImage);
router.post('/updateLandingImage', updateLandingImage);
router.get('/getLandingImages', getLandingImages);

module.exports = router;