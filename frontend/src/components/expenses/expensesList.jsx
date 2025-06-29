// ExpenseList.jsx
import React from 'react';

const ExpenseList = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Expense Entries</h2>
      {data.length === 0 ? (
        <p className="text-gray-500">No expense records found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <li key={index} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.description}</p>
                <p className="text-sm text-gray-500">{item.category} • {new Date(item.date).toLocaleDateString()}</p>
              </div>
              <div className="text-red-600 font-bold text-lg">-${item.amount.toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
