// QuickAddTransaction.jsx
import React, { useState } from 'react';

const QuickAddTransaction = () => {
  const [formData, setFormData] = useState({
    type: 'income',
    description: '',
    amount: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Transaction submitted:', formData);
    // Reset form
    setFormData({ type: 'income', description: '', amount: '' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Quick Add Transaction</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <select name="type" value={formData.type} onChange={handleChange} className="border px-3 py-2 rounded">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="col-span-full md:col-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default QuickAddTransaction;