const sportService = require('../services/sportService');

exports.getAllSports = async (req, res) => {
  try {
    const sports = await sportService.getAllSports();
    res.status(200).json(sports);
  } catch (error) {
    console.error('Error fetching sports:', error);
    res.status(500).json({ error: 'Failed to fetch sports' });
  }
}