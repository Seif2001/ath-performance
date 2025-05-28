const express = require('express');
const router = express.Router();
const athleteController = require('../controllers/athleteController');

router.post('/', athleteController.createAthlete);
router.get('/:coachUID', athleteController.getAthletesByCoachUID);

module.exports = router;