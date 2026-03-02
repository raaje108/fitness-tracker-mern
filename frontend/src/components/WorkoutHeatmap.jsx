import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const WorkoutHeatmap = ({ workouts }) => {
  // 1. Prepare data: Group sets by date
  const dataMap = {};
  workouts.forEach(workout => {
    const date = new Date(workout.createdAt).toISOString().split('T')[0];
    dataMap[date] = (dataMap[date] || 0) + Number(workout.sets);
  });

  // 2. Format for the heatmap component
  const values = Object.keys(dataMap).map(date => ({
    date: date,
    count: dataMap[date]
  }));

  // Define date range (last 4 months)
  const today = new Date();
  const startDate = new Date();
  startDate.setMonth(today.getMonth() - 4);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 transition-colors">
      <h3 className="text-lg font-bold text-blue-600 mb-4 text-center">Consistency Heatmap</h3>
      <div className="heatmap-container">
        <CalendarHeatmap
          startDate={startDate}
          endDate={today}
          values={values}
          classForValue={(value) => {
            if (!value) return 'color-empty';
            if (value.count < 4) return 'color-scale-1';
            if (value.count < 8) return 'color-scale-2';
            if (value.count < 12) return 'color-scale-3';
            return 'color-scale-4';
          }}
          tooltipDataAttrs={value => {
            return { 'data-tip': value.date ? `${value.date}: ${value.count} sets` : 'No workouts' };
          }}
        />
      </div>
    </div>
  );
};

export default WorkoutHeatmap;