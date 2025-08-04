const express = require('express')
const router = express.Router();

const reviewController = require('../controllers/reviewController.js');

// index
router.get('/', reviewController.index);

// post
router.post('/:slug', reviewController.addReview);



module.exports = router;