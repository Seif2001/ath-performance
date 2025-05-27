const express = require('express');
const router = express.Router();
const coachController = require('../controllers/coachController');

router.post('/', coachController.createCoach);
router.get('/:name', coachController.getCoachByName);




module.exports = router;
