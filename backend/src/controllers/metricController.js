const metricService = require('../services/metricService');
exports.getAllMetrics = async (req, res) => {
  try {
    const metrics = await metricService.getAllMetrics();
    res.status(200).json(metrics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
};