const express = require('express');
const coachRoutes = require('./src/routes/coachRoutes');
const videoRoutes = require('./src/routes/videoRoutes');
const Logger = require('./src/utils/logger');
const cors = require('cors');


const app = express();

app.use(express.json());

app.use((req, res, next) => {
    Logger.logRequest(req);
    next();
});

// Middleware: CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(cors({
  origin: '*', // Allow all origins
  methods: 'GET, POST, PUT, DELETE', // Allow specific methods
  allowedHeaders: 'Content-Type', // Allow specific headers
  credentials: true // Allow credentials (if needed)
}));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
// app.use('/athletes', athleteRoutes);
// app.use('/sports', sportRoutes);
app.use('/coaches', coachRoutes);
app.use('/videos', videoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
