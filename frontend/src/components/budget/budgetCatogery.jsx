import React, { useState } from 'react';

const BudgetCategoryForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;
    onAdd({ name, amount: parseFloat(amount) });
    setName('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow space-y-2">
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Category Name" className="w-full p-2 border rounded" />
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Allocated Amount" className="w-full p-2 border rounded" />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add Budget</button>
    </form>
  );
};

export default BudgetCategoryForm;
