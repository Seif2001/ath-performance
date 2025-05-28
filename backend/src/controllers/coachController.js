const { coach } = require('../prisma/client');
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

exports.tagAtheleteToVideo = async (req, res) => {
  const { coachUID, athleteUID, videoUID, metricUID, metric_value, timestamp } = req.body;
  try {
    const taggedVideo = await coachService.tagPlayerToVideo({
      coachUID: parseInt(coachUID),
      athleteUID: parseInt(athleteUID),
      videoUID: parseInt(videoUID),
      metricUID: parseInt(metricUID),
      metric_value: metric_value || null, // Optional field
      timestamp: timestamp, // Use current time if not provided
    });
    res.status(201).json(taggedVideo);
  } catch (error) {
    console.error("Error tagging athlete to video:", error);
    res.status(500).json({ error: error.message });
  }
}

exports.getAthleteTagsByVideoUID = async (req, res) => {
  const { videoUID } = req.params;
  try {
    const athleteTags = await coachService.getAthleteTagsByVideoUID(parseInt(videoUID));
    if (!athleteTags ) {
      return res.status(404).json({ error: 'No athlete tags found for this video' });
    }
    res.status(200).json(athleteTags);
  } catch (error) {
    console.error("Error fetching athlete tags:", error);
    res.status(500).json({ error: error.message });
  }
}

exports.checkAthletePerformanceExists = async (req, res) => {
  const { athleteUID, videoUID } = req.params;
  console.log("Checking athlete performance for:", { athleteUID, videoUID });
  try {
    const exists = await coachService.checkAthletePerformanceExists(parseInt(athleteUID), parseInt(videoUID));
    res.status(200).json({ exists });
  } catch (error) {
    console.error("Error checking athlete performance:", error);
    res.status(500).json({ error: error.message });
  }
}
