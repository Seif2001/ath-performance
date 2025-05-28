const sportController = require('../controllers/sportController');
const express = require('express');

const router = express.Router();

// Route to get all sports
router.get('/', sportController.getAllSports);

module.exports = router;