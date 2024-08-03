const express = require('express');
const router = express.Router();

const {createReview,getAllReviews,deleteReview, softDeleteReview,updateReviewById} = require('../controller/ReviewManagementController');
const {protect} = require('../Middleware/authMiddelware');

router.post('/createReview',createReview);
router.get('/getAllReviews',getAllReviews);
router.put('/updateReviewById/:reviewId',updateReviewById);
router.delete('/deleteReview/:reviewId',deleteReview);
router.put('/softDeleteReview/:reviewId',softDeleteReview); 

module.exports = router;