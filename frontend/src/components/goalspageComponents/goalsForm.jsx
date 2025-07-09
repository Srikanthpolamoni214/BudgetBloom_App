// GoalForm.jsx
import React, { useState } from 'react';

const GoalForm = ({ onAdd }) => {
  const [goal, setGoal] = useState({ name: '', amount: '', targetDate: '', category: '' });

  const handleChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };
const token = localStorage.getItem("token");
const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goal.name || !goal.amount || !goal.targetDate) return alert('Fill all required fields');

    const res = await fetch('http://localhost:3201/api/goalsTracker', {
      method: 'POST',
      headers:  config.headers,
      body: JSON.stringify(goal),
    });

    const data = await res.json();
    alert("goal added")
    onAdd(data);
    setGoal({ name: '', amount: '', targetDate: '', category: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md space-y-3">
      <input name="name" value={goal.name} onChange={handleChange} placeholder="Goal Name" className="w-full p-2 border rounded" />
      <input name="amount" type="number" value={goal.amount} onChange={handleChange} placeholder="Target Amount" className="w-full p-2 border rounded" />
      <input name="targetDate" type="date" value={goal.targetDate} onChange={handleChange} className="w-full p-2 border rounded" />
      <input name="category" value={goal.category} onChange={handleChange} placeholder="Category (optional)" className="w-full p-2 border rounded" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Goal</button>
    </form>
  );
};

export default GoalForm;
