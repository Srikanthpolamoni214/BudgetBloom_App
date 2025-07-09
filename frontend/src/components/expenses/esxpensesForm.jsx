// ExpenseForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onExpenseAdded }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
    month : ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const token = localStorage.getItem("token"); // Get token from storage
const config = { headers: { authorization: `Bearer ${token}` } };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://budgetbloom-app.onrender.com/postexpenses', formData, config);
      console.log("res" , response);
      if (response.data.message === 'Expense added successfully') {
        const updatedExpenses = await axios.get('https://budgetbloom-app.onrender.com/expenses');
        onExpenseAdded(updatedExpenses.data);
        setFormData({ description: '', amount: '', category: '', date: '' });
        alert("Expense added successfully");
      }
    } catch (err) {
      console.error('Failed to add expense:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
      <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border px-3 py-2 rounded" required />
      <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} className="border px-3 py-2 rounded" required />
      <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border px-3 py-2 rounded" required />
      <input type="date" name="date" value={formData.date} onChange={handleChange} className="border px-3 py-2 rounded" required />
      <input type='text' name='month' value={formData.month} onChange={handleChange} required />
      <button type="submit" className="md:col-span-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
