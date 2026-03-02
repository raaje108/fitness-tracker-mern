const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes');
// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// This means every route in workoutRoutes will start with /api/workouts
app.use('/api/workouts', workoutRoutes);
// This means all auth routes will start with /api/user
app.use('/api/user', userRoutes);
// A simple test route
app.get('/', (req, res) => {
  res.send('Fitness Tracker API is breathing! 🚀');
});

// Database Connection & Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🔥 MongoDB Connected Successfully');
    
    // We only start the server IF the database connects successfully
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is actively running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('❌ MongoDB Connection Error: ', err);
  });