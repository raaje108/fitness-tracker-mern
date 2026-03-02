import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutPieChart from '../components/WorkoutPieChart';
import WorkoutHeatmap from '../components/WorkoutHeatmap';


const Home = () => {
  const [workouts, setWorkouts] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null); 
  const { user } = useContext(AuthContext);

  // New Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('All');

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:5000/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  const handleWorkoutAdded = (newWorkout) => {
    setWorkouts([newWorkout, ...workouts]);
  };

  const handleDelete = (deletedId) => {
    setWorkouts(workouts.filter((w) => w._id !== deletedId));
  };

  const handleWorkoutUpdated = (updatedWorkout) => {
    setWorkouts(workouts.map((w) => w._id === updatedWorkout._id ? updatedWorkout : w));
    setEditingWorkout(null); 
  };

  // Logic to filter workouts for the list (does not affect the Pie Chart)
  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch = workout.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = filterGroup === 'All' || workout.muscleGroup === filterGroup;
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="max-w-7xl mx-auto p-8 flex flex-col lg:flex-row gap-8">
      
      <div className="lg:w-2/3">
        {/* Your Original Pie Chart Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
         <WorkoutPieChart workouts={workouts} />
         <WorkoutHeatmap workouts={workouts} />
        </div>

        {/* Search & Filter Bar - Placed right above the cards */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Search exercises..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <select 
            value={filterGroup} 
            onChange={(e) => setFilterGroup(e.target.value)}
            className="p-2 border border-gray-200 rounded-lg bg-white outline-none"
          >
            <option value="All">All Muscles</option>
            <option value="Chest">Chest</option>
            <option value="Back">Back</option>
            <option value="Legs">Legs</option>
            <option value="Shoulders">Shoulders</option>
            <option value="biceps">Biceps</option>
            <option value="triceps">Triceps</option>
            <option value="Core">Core</option>
          </select>
        </div>

        {/* Your Original Workout Card Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredWorkouts && filteredWorkouts.map((workout) => (
            <WorkoutDetails 
              key={workout._id} 
              workout={workout} 
              onDelete={handleDelete} 
              onEdit={() => setEditingWorkout(workout)} 
            />
          ))}
        </div>
        {workouts.length === 0 && <p className="text-gray-500 italic mt-4">No workouts found. Time to hit the gym!</p>}
      </div>

      <div className="lg:w-1/3">
        <WorkoutForm 
          onWorkoutAdded={handleWorkoutAdded} 
          editingWorkout={editingWorkout} 
          onWorkoutUpdated={handleWorkoutUpdated} 
          setEditingWorkout={setEditingWorkout} 
        />
      </div>
      
    </div>
  );
};

export default Home;