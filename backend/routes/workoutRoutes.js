const express = require('express');
const { createWorkout, getWorkouts, deleteWorkout, updateWorkout } = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth'); // Import the bouncer

const router = express.Router();

// Require auth for ALL workout routes
// By putting this here, it protects every single route below it!
router.use(requireAuth); 

// GET all workouts
router.get('/', getWorkouts);

// POST a new workout
router.post('/', createWorkout);

// DELETE a workout
router.delete('/:id', deleteWorkout);

router.patch('/:id', updateWorkout);

module.exports = router;