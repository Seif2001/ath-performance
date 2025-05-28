const express = require('express');
const router = express.Router();
const coachController = require('../controllers/coachController');

router.post('/', coachController.createCoach);
router.get('/:name', coachController.getCoachByName);
router.post('/tag', coachController.tagAtheleteToVideo);
router.get('/video/:videoUID', coachController.getAthleteTagsByVideoUID);
router.get('/checkTag/:athleteUID/:videoUID', coachController.checkAthletePerformanceExists);




module.exports = router;
