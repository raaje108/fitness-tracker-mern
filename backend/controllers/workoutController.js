const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');
// 1. GET all workouts
// 1. GET all workouts (Only for the logged-in user!)
const getWorkouts = async (req, res) => {
  // Grab the specific user's ID that our Bouncer attached to the request
  const user_id = req.user._id;

  try {
    // Only find workouts that match this exact user's ID
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 2. CREATE a new workout
// CREATE a new workout
const createWorkout = async (req, res) => {
  // 👉 Added 'sets' right here
  const { title, load, reps, sets, muscleGroup } = req.body;

  try {
    const user_id = req.user._id;
    
    
    const workout = await Workout.create({ title, load, reps, sets, muscleGroup, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// 3. DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Workout.findOneAndDelete({ _id: id });

    if (!workout) {
      return res.status(404).json({ error: 'No such workout found' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
};
// UPDATE a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  // Make sure the ID is a valid MongoDB ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'});
  }

  // Find the workout and update it with whatever is in the req.body
  // { new: true } tells MongoDB to send back the newly updated version!
  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  }, { new: true });

  if (!workout) {
    return res.status(400).json({error: 'No such workout'});
  }

  res.status(200).json(workout);
};
// DON'T FORGET to add it to your exports at the very bottom!
module.exports = {
  getWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout
};