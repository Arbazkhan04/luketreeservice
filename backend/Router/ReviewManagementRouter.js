const express = require('express');
const router = express.Router();

const {createReview,getAllReviews,deleteReview, getReviewById, softDeleteReview,updateReviewById,publistBackReview} = require('../controller/ReviewManagementController');

router.post('/createReview',createReview);
router.get('/getAllReviews',getAllReviews);
router.get('/getReviewById/:reviewId',getReviewById)
router.put('/updateReviewById/:reviewId',updateReviewById);
router.delete('/deleteReview/:reviewId',deleteReview);
router.put('/softDeleteReview/:reviewId',softDeleteReview); 
router.put('/publistBackReview/:reviewId',publistBackReview);

module.exports = router;