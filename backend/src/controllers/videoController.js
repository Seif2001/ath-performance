const videoService = require('../services/videoService');
const coachService = require('../services/coachService');

const multer = require('multer');
// Configure multer for file uploads

const fs = require('fs');
const path = require('path');

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // must match actual folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use a unique filename
  },
});
const upload = multer({ storage: storage });

exports.uploadVideo = upload.single('video'); // Middleware to handle video file uploads

exports.createVideo = async (req, res) => {
    try {
        const { coachUID } = req.body;        // Sent as text field
        const { filename, path, size } = req.file;  // Sent by multer
        if (!coachUID || !filename || !path || !size) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Validate coachUID
        const coach = await coachService.getCoachById(parseInt(coachUID));
        if (!coach) {
            return res.status(404).json({ error: 'Coach not found' });
        }
        videoService.createVideo({
            url: path,          // File path where the video is stored
            coachUID: parseInt(coachUID), // Coach UID from the request body
            size: size          // Size of the uploaded file
        });

        res.status(201).json(path);
    } catch (error) {
        console.error("Error creating video:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteVideo = async (req, res) => {
    const { UID } = req.params;
    try {
        const video = await videoService.deleteVideo(parseInt(UID));
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        const filePath = video.url;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error("Error deleting video:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getVideosByCoachUID = async (req, res) => {
    const { coachUID } = req.params;
    try {
        const videos = await videoService.getVideoByCoachUID(parseInt(coachUID));
        if (!videos || videos.length === 0) {
            return res.status(404).json({ error: 'No videos found for this coach' });
        }
        res.status(200).json(videos);
    } catch (error) {
        console.error("Error fetching videos:", error);
        res.status(500).json({ error: error.message });
    }
};
  