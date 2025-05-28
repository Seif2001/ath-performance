const metricController = require('../controllers/metricController');
const express = require('express');
const router = express.Router();

// Route to get all metrics
router.get('/', metricController.getAllMetrics);


module.exports = router;