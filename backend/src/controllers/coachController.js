const coachService = require('../services/coachService');


exports.createCoach = async (req, res) => {
  const { name } = req.body;
  try {
    const Coach = await coachService.createCoach({ name});
    res.status(201).json(Coach);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCoachByName = async (req, res) => {
  const { name } = req.params;
  try {
    Coach = await coachService.getCoachByName(name);
    if (!Coach) {
      Coach = await coachService.createCoach(name);
    }
    console.log("Coach fetched:", Coach);
    res.status(200).json(Coach);
  } catch (error) {
    console.error("Error fetching coach:", error);
    res.status(500).json({ error: error.message });
  }
}
