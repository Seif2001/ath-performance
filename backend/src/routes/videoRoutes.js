const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.post('/', videoController.uploadVideo, videoController.createVideo);
router.delete('/:UID', videoController.deleteVideo);
router.get('/:coachUID', videoController.getVideosByCoachUID);

module.exports = router;