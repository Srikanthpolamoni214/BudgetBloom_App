import React from 'react';

const BudgetTable = ({ budgets, onDelete }) => {
  return (
    <table className="w-full text-left border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Category</th>
          <th className="p-2">Allocated</th>
          <th className="p-2">Spent</th>
          <th className="p-2">Remaining</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {budgets.map((item, i) => (
          <tr key={i}>
            <td className="p-2">{item.name}</td>
            <td className="p-2">₹{item.amount}</td>
            <td className="p-2">₹{item.spent}</td>
            <td className="p-2 text-green-600">₹{item.amount - item.spent}</td>
            <td className="p-2">
              <button onClick={() => onDelete(item.budget_id)} className="text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BudgetTable;
