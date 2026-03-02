const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// This defines the structure of our Workout object
const workoutSchema = new Schema({
  title: {
    type: String,
    required: true // The database will reject the save if there is no title
  },
  reps: {
    type: Number,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  load: {
    type: Number,
    required: true
  },

  muscleGroup: {
    type: String,
    enum: ['Chest', 'Back', 'Legs', 'Shoulders', 'biceps', 'triceps' , 'Core'],
    required: true 
  },

  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' properties

module.exports = mongoose.model('Workout', workoutSchema);