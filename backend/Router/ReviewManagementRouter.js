const express = require('express');
const router = express.Router();

const {createReview,getAllReviews,deleteReview,updateReviewCreatedDate, getReviewById, softDeleteReview,updateReviewById,publistBackReview} = require('../controller/ReviewManagementController');
const {protect} = require('../Middleware/authMiddelware');

router.post('/createReview',createReview);
router.get('/getAllReviews',getAllReviews);
router.get('/getReviewById/:reviewId',getReviewById);
router.put('/updateReviewById/:reviewId',protect,updateReviewById);
router.delete('/deleteReview/:reviewId',protect,deleteReview);
router.put('/softDeleteReview/:reviewId',protect,softDeleteReview); 
router.put('/publistBackReview/:reviewId',protect,publistBackReview);
router.put('/updateReviewCreatedDate/:reviewId',protect,updateReviewCreatedDate);

module.exports = router;