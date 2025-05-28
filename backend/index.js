const express = require('express');
const coachRoutes = require('./src/routes/coachRoutes');
const videoRoutes = require('./src/routes/videoRoutes');
const athleteRoutes = require('./src/routes/athleteRoutes');
const sportRoutes = require('./src/routes/sportRoutes'); // Uncomment if you have sport routes
const Logger = require('./src/utils/logger');
const cors = require('cors');
const path = require('path');
const metricRoutes = require('./src/routes/metricRoutes'); // Uncomment if you have metric routes

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    Logger.logRequest(req);
    next();
});

const uploadsPath = path.join(__dirname, 'src/uploads');

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

app.use('/uploads', express.static(uploadsPath));
console.log(`Static uploads path set to: ${uploadsPath}`);
// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/athletes', athleteRoutes);
app.use('/sports', sportRoutes);
app.use('/coaches', coachRoutes);
app.use('/videos', videoRoutes);
app.use('/metrics', metricRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
