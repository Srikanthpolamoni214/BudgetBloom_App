
// GoalTracker.jsx
import React, { useEffect, useState } from 'react';
import ProgressRings from '../goalspageComponents/goalsRings';
import GoalChart from './goalsChart';

 const GoalTracker = () => {
  const [goals, setGoals] = useState([]);
const token = localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`, // ✅ Required
  },
};
  const fetchGoals = async () => {
    const res = await fetch('http://localhost:3201/api/goalsTracker', {
      method: 'GET',
      headers: config.headers,
    });
    const data = await res.json();
    setGoals(data);
  };

  useEffect(() => { fetchGoals(); }, []);

  const deleteGoal = async (goal_id) => {
    await fetch(`http://localhost:3201/api/goalsTracker/${goal_id}`, { method: 'DELETE', headers: config.headers });
    fetchGoals();
  };





  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <div key={goal.id} className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{goal.name}</h3>
            <p className="text-sm text-gray-600">Target: ₹{goal.amount} by {goal.targetDate}</p>
          </div>
          <ProgressRings amount={goal.amount} saved={goal.saved || 0} />
          <button onClick={() => deleteGoal(goal.goal_id)} className="text-red-500 hover:underline">Delete</button>
        </div>
      ))}
          <GoalChart goals={goals} />

    </div>
  );
};

export default GoalTracker