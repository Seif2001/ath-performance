const athleteService = require('../services/athleteService');

exports.createAthlete = async (req, res) => {
  try {
    const athleteData = req.body;
    const newAthlete = await athleteService.createAthlete(athleteData);
    res.status(201).json(newAthlete);
  } catch (error) {
    console.error('Error creating athlete:', error);
    res.status(500).json({ error: 'Failed to create athlete' });
  }
}
exports.getAthletesByCoachUID = async (req, res) => {
  try {
    const { coachUID } = req.params;
    const athletes = await athleteService.getAthleteByCoachUID(parseInt(coachUID));
    if (!athletes || athletes.length === 0) {
      return res.status(404).json({ error: 'No athletes found for this coach' });
    }
    res.status(200).json(athletes);
  } catch (error) {
    console.error('Error fetching athletes:', error);
    res.status(500).json({ error: 'Failed to fetch athletes' });
  }
}

