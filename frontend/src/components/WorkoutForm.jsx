import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

// Accept the new props!
const WorkoutForm = ({ onWorkoutAdded, editingWorkout, onWorkoutUpdated, setEditingWorkout }) => {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('Chest'); 
  const [error, setError] = useState(null);
  
  const { user } = useContext(AuthContext);

  // THIS IS THE MAGIC: Watch the 'editingWorkout' prop. 
  // If it changes, fill the form fields with its data!
  useEffect(() => {
    if (editingWorkout) {
      setTitle(editingWorkout.title);
      setLoad(editingWorkout.load);
      setReps(editingWorkout.reps);
      setSets(editingWorkout.sets);
      setMuscleGroup(editingWorkout.muscleGroup);
    } else {
      // If we cancel the edit, clear the form
      resetForm();
    }
  }, [editingWorkout]);

  const resetForm = () => {
    setTitle(''); setLoad(''); setReps(''); setSets(''); setMuscleGroup('Chest'); setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { setError('You must be logged in'); return; }

    const workoutData = { title, load, reps, sets, muscleGroup };

    // Decide if we are doing a POST (new) or PATCH (update)
    const url = editingWorkout 
      ? `http://localhost:5000/api/workouts/${editingWorkout._id}`
      : 'http://localhost:5000/api/workouts';
    
    const method = editingWorkout ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(workoutData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
    
    const json = await response.json();

    if (!response.ok) { setError(json.error); }
    if (response.ok) {
      resetForm();
      if (editingWorkout) {
        onWorkoutUpdated(json); // Tell Home.jsx the update was successful
      } else {
        onWorkoutAdded(json); // Tell Home.jsx a new one was added
      }
    }
  };

  return (
    <form className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-8" onSubmit={handleSubmit}>
      {/* Change the title based on the mode */}
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {editingWorkout ? 'Edit Workout' : 'Add a New Workout'}
      </h3>

      {/* ... KEEP ALL YOUR EXISTING INPUTS EXACTLY THE SAME ... */}
      <label className="block text-sm font-medium text-gray-700 mb-1">Exercise Title:</label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className="w-full p-2 border border-gray-300 rounded mb-4" required />

      <label className="block text-sm font-medium text-gray-700 mb-1">Load (in kg):</label>
      <input type="number" onChange={(e) => setLoad(e.target.value)} value={load} className="w-full p-2 border border-gray-300 rounded mb-4" required />

      <label className="block text-sm font-medium text-gray-700 mb-1">Sets:</label>
      <input type="number" onChange={(e) => setSets(e.target.value)} value={sets} className="w-full p-2 border border-gray-300 rounded mb-4" required />

      <label className="block text-sm font-medium text-gray-700 mb-1">Reps (per set):</label>
      <input type="number" onChange={(e) => setReps(e.target.value)} value={reps} className="w-full p-2 border border-gray-300 rounded mb-4" required />

      <label className="block text-sm font-medium text-gray-700 mb-1">Target Muscle Group:</label>
      <select value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-6 bg-white">
        <option value="Chest">Chest</option>
        <option value="Back">Back</option>
        <option value="Legs">Legs</option>
        <option value="Shoulders">Shoulders</option>
        <option value="biceps">biceps</option>
        <option value="triceps">triceps</option>
        <option value="Core">Core</option>
      </select>

      <div className="flex gap-2">
        <button className="flex-1 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition-colors shadow-sm">
          {editingWorkout ? 'Update' : 'Add'}
        </button>
        
        {/* If we are editing, show a Cancel button! */}
        {editingWorkout && (
          <button 
            type="button" 
            onClick={() => setEditingWorkout(null)}
            className="flex-1 bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-300 transition-colors shadow-sm"
          >
            Cancel
          </button>
        )}
      </div>
      
      {error && <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
    </form>
  );
};

export default WorkoutForm;