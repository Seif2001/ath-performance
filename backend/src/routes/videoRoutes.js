const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.post('/', videoController.uploadVideo, videoController.createVideo);
router.delete('/:UID', videoController.deleteVideo);
router.get('/:coachUID', videoController.getVideosByCoachUID);
router.get('/video/:UID', videoController.getVideoByUID);
router.put('/updateStatus/:UID', videoController.updateStatus);

module.exports = router;