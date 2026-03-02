import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const WorkoutDetails = ({ workout, onDelete, onEdit }) => {
  const { user } = useContext(AuthContext); // Grab the user token

  const handleDelete = async () => {
    if (!user) return; // Prevent deleting if not logged in

    const response = await fetch('http://localhost:5000/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}` // Show VIP PASS!
      }
    });
    
    const json = await response.json();

    if (response.ok) {
      onDelete(json._id); 
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative group">
      
      {/* --- THIS IS THE HTML YOU ACCIDENTALLY DELETED! --- */}
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-blue-600 uppercase">
          {workout.title}
        </h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          {workout.muscleGroup}
        </span>
      </div>
      
      <p className="text-gray-600">
        <strong className="text-gray-900">Load:</strong> {workout.load} kg
      </p>
      <p className="text-gray-600">
        <strong className="text-gray-900">Sets:</strong> {workout.sets}
      </p>
      <p className="text-gray-600">
        <strong className="text-gray-900">Reps:</strong> {workout.reps}
      </p>
      <p className="text-xs text-gray-400 mt-4">
        Logged: {new Date(workout.createdAt).toLocaleDateString()}
      </p>
      {/* --------------------------------------------------- */}

      {/* Container for the Action Buttons */}
      <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        
        {/* EDIT BUTTON */}
        <button 
          onClick={onEdit}
          className="bg-blue-50 text-blue-600 p-2 rounded-full hover:bg-blue-100 transition-colors"
          title="Edit Workout"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>

        {/* DELETE BUTTON */}
        <button 
          onClick={handleDelete}
          className="bg-red-50 text-red-600 p-2 rounded-full hover:bg-red-100 transition-colors"
          title="Delete Workout"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>

      </div>
    </div>
  );
};

export default WorkoutDetails;