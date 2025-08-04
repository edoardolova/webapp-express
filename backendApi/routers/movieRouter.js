const express = require('express')
const router = express.Router();

const movieController = require('../controllers/movieControllers.js');

// index
router.get('/', movieController.index);

// show
router.get('/:slug', movieController.show);

module.exports = router;