
import React, { useEffect, useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import dayjs from 'dayjs';

const RecentActivityList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = dayjs().format('YYYY-MM-DD');

  const token = localStorage.getItem('token');
  const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch('http://localhost:3201/api/transactions', config);
        const data = await res.json();
        console.log('Fetched transactions:', data);
        
        setTransactions(data.data || data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>

      <ReactTooltip
        id="row-tooltip"
        place="top"
        className="!bg-gray-800 !text-white !rounded-md !text-sm !px-2 !py-1"
      />

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {transactions.map((tx, index) => {
            const isToday = tx.date === today;
            const tooltip = `Type: ${tx.type}, Amount: $${tx.amount}, Category: ${tx.category || 'N/A'}`;

            return (
              <li
                key={index}
                data-tooltip-id="row-tooltip"
                data-tooltip-content={tooltip}
                className={`py-3 px-2 flex items-center justify-between rounded-md transition-all ${
                  isToday ? 'bg-yellow-100' : ''
                } hover:bg-gray-50 cursor-pointer`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xl ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {tx.type === 'income' ? '💰' : '💸'}
                  </span>
                  <div>
                    <p className="font-semibold">{tx.description || 'No description'}</p>
                    <p className="text-sm text-gray-500">{tx.date || 'N/A'}</p>
                  </div>
                </div>
                <div
                  className={`font-bold ${
                    tx.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {tx.type === 'income' ? '+' : '-'}${Number(tx.amount).toLocaleString()}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default RecentActivityList;
