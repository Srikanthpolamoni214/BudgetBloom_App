import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoalProgressBar = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await axios.get('http://localhost:3201/goalRouter');
        setGoals(res.data);
      } catch (err) {
        setError('Failed to fetch goals :' + err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const getBarColor = (percent) => {
    if (percent < 40) return 'bg-red-500';
    if (percent < 80) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  if (loading) return <p>Loading savings goals...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-fit">
      <h2 className="text-xl font-bold mb-4">Goal Progress</h2>
      <div className="space-y-4">
        {goals.map((goal) => {
          const percent = Math.min((goal.current / goal.target) * 100, 100);
          return (
            <div key={goal.id}>
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>{goal.label}</span>
                <span>${goal.current} / ${goal.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ease-in-out ${getBarColor(percent)}`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalProgressBar;
