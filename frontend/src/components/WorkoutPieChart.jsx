import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WorkoutPieChart = ({ workouts }) => {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  // --- Handlers for navigating months ---
  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === now.getMonth() && selectedYear === now.getFullYear()) return;
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // --- Format Data ---
  const monthlyWorkouts = workouts?.filter((workout) => {
    const workoutDate = new Date(workout.createdAt);
    return workoutDate.getMonth() === selectedMonth && workoutDate.getFullYear() === selectedYear;
  });

  const countMap = {};
  monthlyWorkouts?.forEach((workout) => {
    const group = workout.muscleGroup;
    countMap[group] = (countMap[group] || 0) + 1;
  });

  const data = Object.keys(countMap).map((key) => ({
    name: key,
    value: countMap[key]
  }));

  // Premium Vibrant Color Palette
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#14B8A6', '#F43F5E', '#64748B'];

  const dateForMonth = new Date(selectedYear, selectedMonth, 1);
  const monthName = dateForMonth.toLocaleString('default', { month: 'long' });
  const isFutureDisabled = selectedMonth === now.getMonth() && selectedYear === now.getFullYear();

  return (
    // UPGRADE: Smoother shadow, thicker rounded corners, subtle border
    <div className="bg-white p-6 rounded-2xl shadow-lg shadow-blue-900/5 border border-gray-100 h-full flex flex-col relative overflow-hidden">
      
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-2xl opacity-70 pointer-events-none"></div>

      {/* --- PREMIUM NAVIGATION HEADER --- */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        
        {/* UPGRADE: Circular Icon Button */}
        <button 
          onClick={handlePrevMonth} 
          className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="text-center">
          {/* UPGRADE: Gradient Text */}
          <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            {monthName} {selectedYear}
          </h3>
          <span className="inline-block mt-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
            Muscle Report
          </span>
        </div>
        
        {/* UPGRADE: Circular Icon Button */}
        <button 
          onClick={handleNextMonth} 
          disabled={isFutureDisabled}
          className={`p-2 rounded-full transition-all focus:outline-none ${
            isFutureDisabled 
              ? 'bg-gray-50 text-gray-200 cursor-not-allowed' 
              : 'bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-600 focus:ring-2 focus:ring-blue-100'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* --- THE CHART (OR PREMIUM EMPTY STATE) --- */}
      {monthlyWorkouts?.length === 0 ? (
        // UPGRADE: Beautiful Empty State with an Icon
        <div className="flex-grow flex flex-col items-center justify-center min-h-[260px] relative z-10">
          <div className="w-16 h-16 mb-4 rounded-full bg-gray-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No workouts logged.</p>
          <p className="text-sm text-gray-400 mt-1 text-center">Time to hit the gym for {monthName}!</p>
        </div>
      ) : (
        <div className="flex-grow w-full min-h-[260px] relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65} // Slightly thicker donut
                outerRadius={90}
                paddingAngle={4} // Slightly cleaner gaps
                dataKey="value"
                stroke="none" // Removes the default white border on slices for a flatter look
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              {/* UPGRADE: Custom styled tooltip */}
              <Tooltip 
                formatter={(value) => [`${value} workouts`, 'Total']}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', fontWeight: 'bold' }}
                itemStyle={{ color: '#374151' }}
              /> 
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle" // Makes the legend use sleek circles instead of squares
                wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* UPGRADE: "Total" text right in the center of the Donut */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[25px] flex flex-col items-center pointer-events-none">
            <span className="text-3xl font-black text-gray-800">{monthlyWorkouts.length}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPieChart;