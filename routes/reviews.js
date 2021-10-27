const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviews');

//Set up routes for the reviews
router.route('/postReviews/:id').post(reviewController.postReviews);

module.exports = router;