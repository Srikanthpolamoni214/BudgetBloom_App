// RecentActivityList.jsx
import React from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const recentTransactions = [
  { id: 1, type: 'income', description: 'Freelance Payment', amount: 1200, date: '2025-06-14' },
  { id: 2, type: 'expense', description: 'Groceries', amount: 250, date: '2025-06-13' },
  { id: 3, type: 'expense', description: 'Electricity Bill', amount: 150, date: '2025-06-12' },
  { id: 4, type: 'income', description: 'Salary', amount: 2000, date: '2025-06-10' }
];

const RecentActivityList = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      <ul className="divide-y divide-gray-200">
        {recentTransactions.map(tx => (
          <li key={tx.id} className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`text-xl ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {tx.type === 'income' ? <FaArrowDown /> : <FaArrowUp />}
              </span>
              <div>
                <p className="font-semibold">{tx.description}</p>
                <p className="text-sm text-gray-500">{tx.date}</p>
              </div>
            </div>
            <div className={`font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
              {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivityList;
